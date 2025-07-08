import { Injectable, Logger } from '@nestjs/common';

import { InjectPrismaClient } from '@nestjs-mod/prisma';
import * as OTPAuth from 'otpauth';
import { TwoFactorUserDto } from './generated/rest-dto/two-factor-user.dto';
import { PrismaClient } from './generated/prisma-client';
import { TwoFactorEventsService } from './two-factor-events.service';
import { TwoFactorConfiguration } from './two-factor.configuration';
import { TWO_FACTOR_FEATURE } from './two-factor.constants';
import { TwoFactorError, TwoFactorErrorEnum } from './two-factor.errors';

// const TOTP_PERIOD = 30;

@Injectable()
export class TwoFactorService {
  private readonly logger = new Logger(TwoFactorService.name);

  constructor(
    @InjectPrismaClient(TWO_FACTOR_FEATURE)
    private readonly prismaClient: PrismaClient,
    private readonly twoFactorConfiguration: TwoFactorConfiguration,
    private readonly twoFactorEventsService: TwoFactorEventsService,
  ) {}

  async getTotp(options: { username?: string; secret: string; timeout: number }) {
    return new OTPAuth.TOTP({
      // Provider or service the account is associated with.
      issuer: 'SSO',
      // Account identifier.
      label: options.username || 'Account',
      // Algorithm used for the HMAC function, possible values are:
      //   "SHA1", "SHA224", "SHA256", "SHA384", "SHA512",
      //   "SHA3-224", "SHA3-256", "SHA3-384" and "SHA3-512".
      algorithm: 'SHA1',
      // Length of the generated tokens.
      digits: 6,
      // Interval of time for which a token is valid, in seconds.
      ...(options.timeout ? { period: Math.floor(options.timeout / 1000) } : {}),
      // Arbitrary key encoded in base32 or `OTPAuth.Secret` instance
      // (if omitted, a cryptographically secure random secret is generated).
      secret: OTPAuth.Secret.fromBase32(options.secret),
      //   or: `OTPAuth.Secret.fromBase32("US3WHSG7X5KAPV27VANWKQHF3SH3HULL")`
      //   or: `new OTPAuth.Secret()`
    });
  }

  async generateCode(options: {
    type: string;
    operationName: string;
    externalUserId: string;
    externalTenantId: string;
    externalUsername?: string;
    repetition?: boolean;
  }) {
    const twoFactorUser = await this.getOrCreateUser({
      ...options,
      username: options.externalUsername,
    });

    await this.removeOutdateTwoFactorCode(options);
    let timeout = 0;

    if (this.twoFactorConfiguration.getTimeoutValue) {
      timeout = await this.twoFactorConfiguration.getTimeoutValue({
        twoFactorUser,
      });
    }

    const code = String(
      (
        await this.getTotp({
          username: twoFactorUser.username || undefined,
          secret: twoFactorUser.secret,
          timeout,
        })
      ).generate(),
    );

    const existsUsedCode = await this.prismaClient.twoFactorCode.findFirst({
      where: {
        code,
        externalTenantId: options.externalTenantId,
        TwoFactorUser: {
          externalUserId: options.externalUserId,
          externalTenantId: options.externalTenantId,
        },
        used: false,
      },
    });

    if (existsUsedCode?.used) {
      throw new TwoFactorError(TwoFactorErrorEnum.TwoFactorCodePleaseWaitXXSeconds, undefined, { timeout });
    }

    const existsOutdatedCode = await this.prismaClient.twoFactorCode.findFirst({
      where: {
        externalTenantId: options.externalTenantId,
        operationName: options.operationName,
        type: options.type,
        TwoFactorUser: {
          externalUserId: options.externalUserId,
          externalTenantId: options.externalTenantId,
        },
        used: false,
        outdated: true,
      },
    });

    if (existsOutdatedCode) {
      this.logger.debug(existsOutdatedCode);
      await this.prismaClient.twoFactorCode.updateMany({
        data: { used: true },
        where: {
          externalTenantId: options.externalTenantId,
          operationName: options.operationName,
          type: options.type,
          TwoFactorUser: {
            externalUserId: options.externalUserId,
            externalTenantId: options.externalTenantId,
          },
          used: false,
          outdated: true,
        },
      });
      throw new TwoFactorError(TwoFactorErrorEnum.TwoFactorCodePleaseWaitXXSeconds, undefined, { timeout });
    }

    // disable old codes
    await this.prismaClient.twoFactorCode.updateMany({
      data: { outdated: true },
      where: {
        externalTenantId: options.externalTenantId,
        operationName: options.operationName,
        type: options.type,
        TwoFactorUser: {
          externalUserId: options.externalUserId,
          externalTenantId: options.externalTenantId,
        },
      },
    });

    try {
      const twoFactorCode = await this.prismaClient.twoFactorCode.create({
        include: { TwoFactorUser: true },
        data: {
          code,
          externalTenantId: options.externalTenantId,
          operationName: options.operationName,
          type: options.type,
          TwoFactorUser: {
            connect: {
              externalTenantId_externalUserId: {
                externalUserId: options.externalUserId,
                externalTenantId: options.externalTenantId,
              },
            },
          },
          used: false,
          outdated: false,
        },
      });

      await this.twoFactorEventsService.send({
        GenerateCode: {
          twoFactorUser,
          twoFactorCode,
          code,
          repetition: Boolean(options.repetition),
        },
        externalTenantId: options.externalTenantId,
        externalUserId: options.externalUserId,
        operationName: options.operationName,
        type: options.type,
      });

      return { twoFactorUser, twoFactorCode, twoFactorTimeout: timeout };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err, err.stack);
      throw new TwoFactorError(TwoFactorErrorEnum.TwoFactorCodePleaseWaitXXSeconds, undefined, { timeout });
    }
  }

  async validateCode(options: { operationName: string; code: string; externalTenantId: string }) {
    let twoFactorCode = await this.prismaClient.twoFactorCode.findFirst({
      include: { TwoFactorUser: true },
      where: {
        code: { equals: options.code },
        externalTenantId: options.externalTenantId,
      },
    });

    if (!twoFactorCode) {
      throw new TwoFactorError(TwoFactorErrorEnum.TwoFactorCodeNotSet);
    }

    if (twoFactorCode.outdated) {
      throw new TwoFactorError(TwoFactorErrorEnum.TwoFactorCodeIsOutdated);
    }

    if (twoFactorCode.used) {
      throw new TwoFactorError(TwoFactorErrorEnum.TwoFactorCodeIsUsed);
    }

    let timeout = 0;
    if (this.twoFactorConfiguration.getTimeoutValue) {
      timeout = await this.twoFactorConfiguration.getTimeoutValue({
        twoFactorCode,
        twoFactorUser: twoFactorCode.TwoFactorUser,
      });

      const totp = await this.getTotp({
        secret: twoFactorCode.TwoFactorUser.secret,
        username: twoFactorCode.TwoFactorUser.username || undefined,
        timeout,
      });

      const tokenIsValid =
        totp.validate({
          token: options.code,
          window: 1,
        }) !== null;

      if (!tokenIsValid) {
        throw new TwoFactorError(TwoFactorErrorEnum.TwoFactorCodeIsOutdated);
      }
    }

    twoFactorCode = await this.prismaClient.twoFactorCode.update({
      include: { TwoFactorUser: true },
      data: {
        used: true,
      },
      where: {
        id: twoFactorCode.id,
        externalTenantId: options.externalTenantId,
      },
    });

    return { twoFactorUser: twoFactorCode.TwoFactorUser, twoFactorCode, twoFactorTimeout: timeout };
  }

  private async getOrCreateUser(options: {
    externalUserId: string;
    externalTenantId: string;
    username?: string;
  }): Promise<TwoFactorUserDto> {
    const secret = new OTPAuth.Secret({ size: 20 });
    return await this.prismaClient.twoFactorUser.upsert({
      create: {
        externalTenantId: options.externalTenantId,
        externalUserId: options.externalUserId,
        secret: secret.base32,
        username: options.username,
      },
      update: {},
      where: {
        externalTenantId_externalUserId: {
          externalTenantId: options.externalTenantId,
          externalUserId: options.externalUserId,
        },
      },
    });
  }

  private async removeOutdateTwoFactorCode(options: { externalUserId: string; externalTenantId: string }) {
    const twoFactorCodes = await this.prismaClient.twoFactorCode.findMany({
      include: { TwoFactorUser: true },
      where: {
        TwoFactorUser: {
          externalTenantId: { equals: options.externalTenantId },
          externalUserId: { equals: options.externalUserId },
        },
        used: { equals: false },
        externalTenantId: options.externalTenantId,
      },
    });

    const itemIdsForDelete = (
      await Promise.all(
        twoFactorCodes.map(async (twoFactorCode) =>
          this.twoFactorConfiguration.getTimeoutValue &&
          +new Date() - +twoFactorCode.updatedAt >
            (await this.twoFactorConfiguration.getTimeoutValue({
              twoFactorCode,
              twoFactorUser: twoFactorCode.TwoFactorUser,
            }))
            ? twoFactorCode
            : undefined,
        ),
      )
    )
      .filter(Boolean)
      .map((item) => item?.id) as string[];

    await this.prismaClient.twoFactorCode.updateMany({
      data: {
        outdated: true,
      },
      where: {
        id: { in: itemIdsForDelete },
        externalTenantId: options.externalTenantId,
      },
    });
  }
}
