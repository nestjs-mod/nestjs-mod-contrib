import { Authorizer, ConfigType } from '@authorizerdev/authorizer-js';
import { ExecutionContext, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizerConfiguration } from './authorizer.configuration';
import { AllowEmptyUser, CheckAccess } from './authorizer.decorators';
import { AuthorizerEnvironments } from './authorizer.environments';
import { AuthorizerError } from './authorizer.errors';
import { AuthorizerRequest, AuthorizerUser } from './authorizer.types';

@Injectable()
export class AuthorizerService extends Authorizer implements OnModuleInit {
  private logger = new Logger(AuthorizerService.name);

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
        authorizerConfiguration.extraHeaders?.['x-authorizer-url'] ||
        this.config.extraHeaders?.['x-authorizer-url'] ||
        '',
    };
  }

  async onModuleInit() {
    if (!this.config.clientID) {
      const authEnvs: { CLIENT_ID: string } = (
        await this.graphqlQuery({
          query: '{_env{CLIENT_ID}}',
          variables: {},
          headers: this.config.extraHeaders,
        })
      )?.data?._env;

      this.config.clientID = authEnvs?.['CLIENT_ID'];
    }
  }

  async getUserFromRequest(ctx: ExecutionContext, checkAccess = true): Promise<AuthorizerUser | undefined> {
    await this.tryGetOrCreateCurrentUserWithExternalUserId(ctx);

    const req = this.getRequestFromExecutionContext(ctx);

    await this.checkAccessValidator(checkAccess, ctx);

    this.setInfoOfExternalUserIdToRequest(req);

    this.setSkippedByAuthorizerIfUserIsEmpty(req);

    return req.authorizerUser;
  }

  private setSkippedByAuthorizerIfUserIsEmpty(req: AuthorizerRequest) {
    req.skippedByAuthorizer = req.authorizerUser === undefined || req.authorizerUser?.id === undefined;
  }

  private setInfoOfExternalUserIdToRequest(req: AuthorizerRequest) {
    if (
      this.authorizerConfiguration.externalUserIdHeaderName &&
      req.authorizerUser?.id &&
      !req?.headers?.[this.authorizerConfiguration.externalUserIdHeaderName]
    ) {
      req.headers[this.authorizerConfiguration.externalUserIdHeaderName] = req.authorizerUser?.id;
      req.externalUserId = req?.headers?.[this.authorizerConfiguration.externalUserIdHeaderName];
    }
  }

  private async checkAccessValidator(checkAccess: boolean, ctx: ExecutionContext) {
    const req = this.getRequestFromExecutionContext(ctx);
    const { checkAccessMetadata, allowEmptyUserMetadata } = this.getHandlersReflectMetadata(ctx);

    if (allowEmptyUserMetadata) {
      req.skipEmptyAuthorizerUser = true;
    }

    if (checkAccess) {
      // check access by custom logic
      const checkAccessValidatorResult = this.authorizerConfiguration.checkAccessValidator
        ? await this.authorizerConfiguration.checkAccessValidator(req.authorizerUser, checkAccessMetadata, ctx)
        : false;

      // check access by roles
      if (req.skipEmptyAuthorizerUser && !checkAccessValidatorResult && !req.authorizerUser?.id) {
        throw new AuthorizerError('Unauthorized');
      }
    }
  }

  private async tryGetOrCreateCurrentUserWithExternalUserId(ctx: ExecutionContext) {
    const req = this.getRequestFromExecutionContext(ctx);

    if (!req.authorizerUser?.id) {
      const token = req.headers?.authorization?.split(' ')[1];

      if (token) {
        // check user in authorizer
        try {
          const getProfileResult = await this.getProfile(req?.headers);
          if (getProfileResult.errors?.length === 0) {
            req.authorizerUser = getProfileResult.data as AuthorizerUser;
          } else {
            for (const err of getProfileResult.errors) {
              this.logger.error(err.message, err.stack);
            }
            throw new AuthorizerError(getProfileResult.errors[0].message);
          }
        } catch (err) {
          req.authorizerUser = { id: undefined };
        }
      }

      // check external user id
      if (!req.authorizerUser) {
        if (this.authorizerConfiguration.externalUserIdHeaderName) {
          req.externalUserId = req?.headers?.[this.authorizerConfiguration.externalUserIdHeaderName];
        }
        if (this.authorizerConfiguration.externalAppIdHeaderName) {
          req.externalAppId = req?.headers?.[this.authorizerConfiguration.externalAppIdHeaderName];
        }

        if (req.externalAppId && !this.authorizerEnvironments.allowedExternalAppIds?.includes(req.externalAppId)) {
          req.authorizerUser = {
            id:
              req.externalUserId && this.authorizerConfiguration.getAuthorizerUserFromExternalUserId
                ? (
                    await this.authorizerConfiguration.getAuthorizerUserFromExternalUserId(
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

    req.authorizerUser = req.authorizerUser || { id: undefined };
  }

  private getRequestFromExecutionContext(ctx: ExecutionContext) {
    return this.authorizerConfiguration.getRequestFromContext?.(ctx) || {};
  }

  private getHandlersReflectMetadata(ctx: ExecutionContext) {
    const allowEmptyUserMetadata =
      (typeof ctx.getHandler === 'function' && this.reflector.get(AllowEmptyUser, ctx.getHandler())) ||
      (typeof ctx.getClass === 'function' && this.reflector.get(AllowEmptyUser, ctx.getClass())) ||
      undefined;

    const checkAccessMetadata =
      (typeof ctx.getHandler === 'function' && this.reflector.get(CheckAccess, ctx.getHandler())) ||
      (typeof ctx.getClass === 'function' && this.reflector.get(CheckAccess, ctx.getClass())) ||
      undefined;
    return { checkAccessMetadata, allowEmptyUserMetadata };
  }
}
