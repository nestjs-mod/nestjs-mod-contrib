import { ConfigType } from '@authorizerdev/authorizer-js';
import {
  ConfigModel,
  ConfigModelProperty,
  getRequestFromExecutionContext,
} from '@nestjs-mod/common';
import { ExecutionContext } from '@nestjs/common';
import {
  AuthorizerRequest,
  AuthorizerUser,
  CheckAccessOptions,
} from './authorizer.types';

export const defaultAuthorizerCheckAccessValidator = async (
  authorizerUser?: AuthorizerUser,
  options?: CheckAccessOptions
) => {
  return Boolean(
    authorizerUser?.roles?.length &&
      options?.roles?.length &&
      options.roles?.some((or) =>
        authorizerUser?.roles?.some((ur) => ur === or)
      )
  );
};

export const defaultAuthorizerGetAuthorizerUserFromExternalUserId = (
  externalUserId: string
) => ({ id: externalUserId });
@ConfigModel()
export class AuthorizerConfiguration
  implements Pick<ConfigType, 'extraHeaders'>
{
  @ConfigModelProperty({
    description: 'Extra headers',
  })
  extraHeaders?: Record<string, string> | undefined;

  @ConfigModelProperty({
    description: 'Function for resolve request from execution context',
    default: getRequestFromExecutionContext,
  })
  getRequestFromContext?: (ctx: ExecutionContext) => AuthorizerRequest;

  @ConfigModelProperty({
    description: 'External function for validate permissions',
    default: defaultAuthorizerCheckAccessValidator,
  })
  checkAccessValidator?: (
    authorizerUser?: AuthorizerUser,
    options?: CheckAccessOptions,
    ctx?: ExecutionContext
  ) => Promise<boolean>;

  @ConfigModelProperty({
    description:
      'A header for searching for an external user ID, if you have logged in previously and do not need to log in again in the authorization service, can be used during testing.',
    default: 'x-external-user-id',
  })
  externalUserIdHeaderName?: string;

  @ConfigModelProperty({
    description:
      'Header for searching for external application identifiers, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing.',
    default: 'x-external-app-id',
  })
  externalAppIdHeaderName?: string;

  @ConfigModelProperty({
    description: 'Function for resolve authorizer user by externalUserId',
    default: defaultAuthorizerGetAuthorizerUserFromExternalUserId,
  })
  getAuthorizerUserFromExternalUserId?: (
    externalUserId: string,
    externalAppId?: string,
    ctx?: ExecutionContext
  ) => Promise<AuthorizerUser>;
}
