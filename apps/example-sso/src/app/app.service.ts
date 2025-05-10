import { SsoService } from '@nestjs-mod/sso';
import { SsoErrorEnum, SsoRole } from '@nestjs-mod/sso-rest-sdk';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isAxiosError } from 'axios';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(private readonly ssoService: SsoService) { }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getProfile(headers?: Record<string, string>) {
    try {
      const profileResult = await this.ssoService.getSsoClient().getSsoApi().ssoControllerProfile({ headers })
      return profileResult.data
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Unhandled error', HttpStatus.BAD_REQUEST);
    }
  }


  async signIn(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<string | undefined> {
    try {
      const signupUserResult = await this.ssoService.getSsoClient().getSsoApi().ssoControllerSignIn({
        password: user.password,
        email: user.email.toLowerCase(),
        fingerprint: 'fingerprint'
      });
      return signupUserResult.data?.accessToken;
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Unhandled error', HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<void | null> {
    try {
      const signupUserResult = await this.ssoService.getSsoClient().getSsoApi().ssoControllerSignUp({
        username: user.username,
        password: user.password,
        confirmPassword: user.password,
        email: user.email.toLowerCase(),
        fingerprint: 'fingerprint'
      });
      await this.ssoService
        .getSsoClient(true)
        .getSsoApi()
        .ssoUsersControllerUpdateOne(signupUserResult.data.user.id, {
          roles: SsoRole.User.toLowerCase(),
        });

      await this.verifyUser({
        externalUserId: signupUserResult.data.user.id,
        email: signupUserResult.data.user.email,
      });

      this.logger.debug(
        `User with email: ${signupUserResult.data.user.email} successfully created!`
      );
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.data?.code !== SsoErrorEnum.Sso011 && err.response?.data?.code !== SsoErrorEnum.Sso003) {
          this.logger.debug(err.response?.data);
          this.logger.debug(err, err.stack);
          if (err.response?.data?.message) {
            throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
          }
        }
      }
      throw new HttpException('Failed to create a user', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser({
    externalUserId,
    email,
  }: {
    externalUserId: string;
    email: string;
  }) {
    await this.ssoService
      .getSsoClient(true)
      .getSsoApi()
      .ssoUsersControllerUpdateOne(externalUserId, {
        emailVerifiedAt: new Date().toISOString(),
        email,
      });
    return this;
  }
}
