import { ConfigModel, ConfigModelProperty, NumberTransformer } from '@nestjs-mod/common';

@ConfigModel()
export class DockerComposeAuthorizerConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name.',
    default: 'lakhansamani/authorizer:1.3.8',
  })
  image?: string;

  @ConfigModelProperty({
    description: 'Feature name for generate prefix to environments keys.',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'External port for sharing container.',
    transform: new NumberTransformer(),
    default: 8080,
  })
  externalClientPort?: number;

  @ConfigModelProperty({
    description: 'Depends on services',
  })
  dependsOnServiceNames?: Record<string, 'service_started' | 'service_healthy' | 'service_completed_successfully'>;

  // cfg @see https://docs.authorizer.dev/core/env

  @ConfigModelProperty({
    description: 'Which env you are running your server in. Supported envs production, development.',
    default: 'production',
  })
  env?: 'production' | 'development';

  @ConfigModelProperty({
    description: 'Reset password link, that can be used to send the correct forgot password link.',
    default: '/reset-password',
  })
  resetPasswordUrl?: string;

  @ConfigModelProperty({
    description: 'Used to explicitly disable email and password based authentication.',
  })
  disableBasicAuthentication?: string;

  @ConfigModelProperty({
    description: 'Used to disable the email verification while signing up.',
  })
  disableEmailVerification?: string;

  @ConfigModelProperty({
    description: 'Used to disable the password less login up.',
  })
  disableMagicLinkLogin?: string;

  @ConfigModelProperty({
    description:
      'Used to disable the default login page that comes with authorizer instance. This is helpful when user is building their custom login page.',
  })
  disableLoginPage?: string;

  @ConfigModelProperty({
    description:
      'Used to disable the sign up feature. It is useful when you want to have beta release of your product and invite only limited users.',
  })
  disableSignUp?: string;

  @ConfigModelProperty({
    description: 'Comma separated list of roles that your platform supports.',
    default: 'user,admin',
  })
  roles?: string;

  @ConfigModelProperty({
    description:
      'Comma separated list of roles that acts as Default roles which you would like to assign to users while they signup /login.',
    default: 'user',
  })
  defaultRoles?: string;

  @ConfigModelProperty({
    description:
      'Comma separated list of roles for which signup should be disabled. Example admin roles. This roles can only assigned manually via super admin like adminUpdateProfile.',
  })
  protectedRoles?: string;

  @ConfigModelProperty({
    description: 'Claim key that will be part of JWT token.',
    default: 'role',
  })
  jwtRoleClaim?: string;

  @ConfigModelProperty({
    description: 'Name of organization that you want on default login page.',
    default: 'Authorizer',
  })
  organizationName?: string;

  @ConfigModelProperty({
    description: 'Logo of organization that you want on default login page.',
    default: 'Authorizer Logo',
  })
  organizationLogo?: string;

  @ConfigModelProperty({
    description:
      'Javascript function to add extra keys to your JWT id token. This feature is developed using otto and only supports writing function in ES5. Check the sample here.',
  })
  customAccessTokenScript?: string;

  @ConfigModelProperty({
    description: 'AWS, region id, where dynamod db tables are to be created. Used with DATABASE_TYPE=dynamodb.',
  })
  awsRegion?: string;

  @ConfigModelProperty({
    description: 'Bucket used for couchbase database. Used with DATABASE_TYPE=couchbase.',
    default: 'authorizer',
  })
  couchbaseBucket?: string;

  @ConfigModelProperty({
    description:
      'RAM Quota for the bucket used for couchbase database. It has to be numeric value only. Used with DATABASE_TYPE=couchbase.',
    default: 1000,
    transform: new NumberTransformer(),
  })
  couchbaseBucketRamQuota?: number;

  @ConfigModelProperty({
    description: 'Scope in which bucket is created. Used with DATABASE_TYPE=couchbase.',
    default: '_default',
  })
  couchbaseScope?: string;

  // un documented
  // https://github.com/authorizerdev/authorizer/blob/27b51ad36918b922934d8dd47f72e6fbefca5dcb/server/constants/env.go

  @ConfigModelProperty()
  test?: string;

  @ConfigModelProperty()
  envPath?: string;

  @ConfigModelProperty()
  isEmailServiceEnabled?: string;

  @ConfigModelProperty()
  isSmsServiceEnabled?: string;

  @ConfigModelProperty()
  appCookieSecure?: string;

  @ConfigModelProperty()
  adminCookieSecure?: string;

  @ConfigModelProperty()
  jwtType?: string;

  @ConfigModelProperty()
  jwk?: string;

  @ConfigModelProperty()
  disableMobileBasicAuthentication?: string;

  @ConfigModelProperty()
  disableRedisForEnv?: string;

  @ConfigModelProperty()
  disableStrongPassword?: string;

  @ConfigModelProperty()
  enforceMultiFactorAuthentication?: string;

  @ConfigModelProperty()
  disableMultiFactorAuthentication?: string;

  @ConfigModelProperty()
  disableTotpLogin?: string;

  @ConfigModelProperty()
  disableMailOtpLogin?: string;

  @ConfigModelProperty()
  disablePhoneVerification?: string;

  @ConfigModelProperty()
  defaultAuthorizeResponseType?: string;

  @ConfigModelProperty()
  defaultAuthorizeResponseMode?: string;

}
