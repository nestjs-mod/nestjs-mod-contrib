import { ArrayOfStringTransformer, BooleanTransformer, EnvModel, EnvModelProperty, NumberTransformer } from '@nestjs-mod/common';
import { IsNotEmpty, IsOptional } from 'class-validator';
import ms from 'ms';

export enum SsoRole {
  admin = 'admin',
  manager = 'manager',
  user = 'user',
}


@EnvModel()
export class DockerComposeSsoEnvironments {

  @EnvModelProperty({
    description:
      'Postgres database connection string',
  })
  @IsNotEmpty()
  databaseUrl!: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Port on which server should be running',
    default: 8080,
    transform: new NumberTransformer(),
  })
  singleSignOnPort?: number;

  @EnvModelProperty({
    description:
      'Storage for cache',
  })
  @IsNotEmpty()
  singleSignOnKeyvUrl!: string;

  @EnvModelProperty({
    description:
      'Minio host (for store profile picture)',
  })
  @IsNotEmpty()
  singleSignOnMinioServerHost!: string;

  @EnvModelProperty({
    description:
      'Minio access key (for store profile picture)',
  })
  @IsNotEmpty()
  singleSignOnMinioAccessKey!: string;

  @EnvModelProperty({
    description:
      'Minio secret key (for store profile picture)',
  })
  @IsNotEmpty()
  singleSignOnMinioSecretKey!: string;

  /***********************
   * NOTIFICATIONS
   **********************/
  @EnvModelProperty({
    description:
      'Mail transport (example: smtps://username@domain.com:password@smtp.domain.com)',
  })
  singleSignOnNotificationsMailTransport?: string;

  @EnvModelProperty({
    description: 'Default sender name (example: Username)',
  })
  singleSignOnNotificationsMailDefaultSenderName?: string;

  @EnvModelProperty({
    description: 'Default sender email (example: username@domain.com)',
  })
  singleSignOnNotificationsMailDefaultSenderEmail?: string;


  /***********************
   * SSO
   **********************/

  // variables for emails and redirects

  @EnvModelProperty({
    description: 'Server URL',
  })
  @IsNotEmpty()
  singleSignOnSsoServerUrl!: string;

  @EnvModelProperty({
    description: 'Client URL',
  })
  @IsNotEmpty()
  singleSignOnSsoClientUrl!: string;

  // default admin settings

  @EnvModelProperty({
    description: 'Admin secret key',
  })
  singleSignOnSsoAdminSecret?: string;

  @EnvModelProperty({
    description: 'Global admin username',
    default: 'admin@example.com',
  })
  singleSignOnSsoAdminEmail?: string;

  @EnvModelProperty({
    description: 'Global admin username',
    default: 'admin',
  })
  @IsNotEmpty()
  singleSignOnSsoAdminUsername?: string;

  @EnvModelProperty({
    description: 'Global admin password',
  })
  singleSignOnSsoAdminPassword?: string;

  // roles

  @EnvModelProperty({
    description: 'Available user roles',
    default: Object.keys(SsoRole),
    transform: new ArrayOfStringTransformer(),
    hidden: true,
  })
  @IsOptional()
  singleSignOnSsoUserAvailableRoles?: string[];

  @EnvModelProperty({
    description: 'Default roles for new user',
    default: [SsoRole.user],
    transform: new ArrayOfStringTransformer(),
    hidden: true,
  })
  @IsOptional()
  singleSignOnSsoUserDefaultRoles?: string[];

  @EnvModelProperty({
    description: 'Default roles for admin',
    default: [SsoRole.admin],
    transform: new ArrayOfStringTransformer(),
    hidden: true,
  })
  @IsOptional()
  singleSignOnSsoAdminDefaultRoles?: string[];

  @EnvModelProperty({
    description: 'Default roles for manager',
    default: [SsoRole.manager],
    transform: new ArrayOfStringTransformer(),
    hidden: true,
  })
  @IsOptional()
  singleSignOnSsoManagerDefaultRoles?: string[];

  // JWT
  @EnvModelProperty({
    description: 'Secret key for generate jwt keys',
    default: 'AcJwUY9AP6FPf8XnfwbSuW7ZjwoaPiFJ',
    hidden: true,
  })
  @IsOptional()
  singleSignOnSsoJwtSecretKey?: string;

  @EnvModelProperty({
    description: 'Access token expires in',
    default: '30m',
    hidden: true,
  })
  @IsOptional()
  singleSignOnSsoJwtAccessTokenExpiresIn!: ms.StringValue;

  @EnvModelProperty({
    description: 'Refresh token expires in',
    default: '24h',
    hidden: true,
  })
  @IsOptional()
  singleSignOnSsoJwtRefreshTokenExpiresIn!: ms.StringValue;

  // cache settings
  @EnvModelProperty({
    description: 'TTL for cached data',
    default: 15_000,
    hidden: true,
  })
  singleSignOnSsoCacheTTL?: number;

  // projects
  @EnvModelProperty({
    description:
      'Default public projects (example: "name1:ru=название1:tt=исем1,clientId1,clientSecret1;name2:ru=название2:tt=исем2,clientId2,clientSecret2")',
  })
  singleSignOnSsoDefaultPublicProjects?: string;

  @EnvModelProperty({
    description:
      'Default projects (example: "name3:ru=название3,clientId3,clientSecret3;name4:ru=название4,clientId4,clientSecret4")',
  })
  singleSignOnSsoDefaultProject?: string;

  // verification settings
  @EnvModelProperty({
    description: 'Used to disable the email verification while signing up',
    transform: new BooleanTransformer(),
    default: false,
    hidden: true,
  })
  singleSignOnSsoDisableEmailVerification?: boolean;

  // oauth settings
  @EnvModelProperty({
    description:
      'Client ID for Google application (https://console.cloud.google.com/apis/credentials)',
  })
  singleSignOnSsoGoogleOauthClientId?: string;

  @EnvModelProperty({
    description:
      'Client secret key for Google application (https://console.cloud.google.com/apis/credentials)',
  })
  singleSignOnSsoGoogleOauthClientSecretKey?: string;
}
