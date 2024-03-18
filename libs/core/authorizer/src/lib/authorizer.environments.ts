import { ConfigType } from '@authorizerdev/authorizer-js';
import { ArrayOfStringTransformer, EnvModel, EnvModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@EnvModel()
export class AuthorizerEnvironments implements Omit<ConfigType, 'extraHeaders' | 'clientID'> {
  @EnvModelProperty({
    description: 'Client ID',
  })
  clientId!: string;

  @EnvModelProperty({
    description: 'Authorizer URL',
  })
  @IsNotEmpty()
  authorizerURL!: string;

  @EnvModelProperty({
    description: 'Redirect URL',
  })
  @IsNotEmpty()
  redirectURL!: string;

  @EnvModelProperty({
    description: 'Admin secret',
  })
  adminSecret?: string;

  @EnvModelProperty({
    description:
      'Allowed identifiers of external applications, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing.',
    transform: new ArrayOfStringTransformer(),
  })
  allowedExternalAppIds?: string[];
}
