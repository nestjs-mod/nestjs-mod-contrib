import { Authorizer, ConfigType } from '@authorizerdev/authorizer-js';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizerConfiguration } from './authorizer.configuration';
import { AllowEmptyUser, CheckAccess } from './authorizer.decorators';
import { AuthorizerEnvironments } from './authorizer.environments';
import { AuthorizerError } from './authorizer.errors';
import { AuthorizerUser } from './authorizer.types';

@Injectable()
export class AuthorizerService extends Authorizer {
  constructor(
    private readonly _config: ConfigType,
    private readonly reflector: Reflector,
    private readonly authorizerConfiguration: AuthorizerConfiguration,
    private readonly authorizerEnvironments: AuthorizerEnvironments
  ) {
    super(_config);
    this.config.extraHeaders = {
      ...(this.config.extraHeaders || {}),
      ['x-authorizer-url']:
        _config.extraHeaders?.['x-authorizer-url'] || this.config.extraHeaders?.['x-authorizer-url'] || '',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUserFromRequest(ctx: ExecutionContext, checkAccess = true): Promise<AuthorizerUser | undefined> {
    const req = this.authorizerConfiguration.getRequestFromContext!(ctx) || {};

    const allowEmptyUserMetadata =
      (typeof ctx.getHandler === 'function' && this.reflector.get(AllowEmptyUser, ctx.getHandler())) ||
      (typeof ctx.getClass === 'function' && this.reflector.get(AllowEmptyUser, ctx.getClass())) ||
      undefined;

    const checkAccessMetadata =
      (typeof ctx.getHandler === 'function' && this.reflector.get(CheckAccess, ctx.getHandler())) ||
      (typeof ctx.getClass === 'function' && this.reflector.get(CheckAccess, ctx.getClass())) ||
      undefined;

    if (!req.authorizerUser?.id) {
      const token = req.headers?.authorization?.split(' ')[1];

      if (token) {
        // check user in authorizer
        try {
          req.authorizerUser = (await this.getProfile(req?.headers)) as AuthorizerUser;
        } catch (err) {
          req.authorizerUser = { id: undefined };
        }
      }

      // check external user id
      if (!req.authorizerUser) {
        req.externalUserId = req?.headers?.[this.authorizerConfiguration.externalUserIdHeaderName!];
        req.externalAppId = req?.headers?.[this.authorizerConfiguration.externalAppIdHeaderName!];

        if (req.externalAppId && !this.authorizerEnvironments.allowedExternalAppIds?.includes(req.externalAppId)) {
          req.authorizerUser = {
            id: req.externalUserId
              ? (
                  await this.authorizerConfiguration.getAuthorizerUserFromExternalUserId!(
                    req.externalUserId,
                    req.externalAppId,
                    ctx
                  )
                )?.id
              : undefined,
          };
        }
      }
    }

    if (checkAccess) {
      // check access by custom logic
      const checkAccessValidatorResult = this.authorizerConfiguration.checkAccessValidator
        ? await this.authorizerConfiguration.checkAccessValidator(req.authorizerUser, checkAccessMetadata, ctx)
        : false;

      // check access by roles
      if (allowEmptyUserMetadata) {
        req.authorizerUser = req.authorizerUser || { id: undefined };
      } else {
        if (!checkAccessValidatorResult && !req.authorizerUser?.id) {
          throw new AuthorizerError('Unauthorized');
        }
      }
    }

    return req.authorizerUser;
  }
}
