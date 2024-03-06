import {
  ConfigModel,
  ConfigModelProperty,
  EnvModel,
  EnvModelProperty,
  NumberTransformer,
} from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

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
    description:
      'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'External port for sharing container.',
    transform: new NumberTransformer(),
    default: 8000,
  })
  externalClientPort?: number;

  @ConfigModelProperty({
    description: 'Depends on services',
  })
  dependsOnServiceNames?: Record<string, 'service_started' | 'service_healthy' | 'service_completed_successfully'>;

  // cfg @see https://docs.authorizer.dev/core/env

  @ConfigModelProperty({
    description:
      'Which env you are running your server in. Supported envs production, development.',
    default: 'production',
  })
  env?: 'production' | 'development';

  @ConfigModelProperty({
    description:
      'Port on which database connection should be made. This is used when DATABASE_URL is not mentioned. At the moment supported by cassandradb.',
  })
  databasePort?: string;

  @ConfigModelProperty({
    description:
      'Host/IP on which database connection should be made. This is used when DATABASE_URL is not mentioned. At the moment supported by cassandradb type.',
  })
  databaseHost?: string;

  @ConfigModelProperty({
    description:
      'Username for the database access with permission to create tables and records. At the moment supported by cassandradb, scylladb type.',
  })
  databaseUsername?: string;

  @ConfigModelProperty({
    description:
      'Password for the database access with permission to create tables and records. At the moment supported by cassandradb, scylladb type.',
  })
  databasePassword?: string;

  @ConfigModelProperty({
    description:
      'Base64 encoded certificate string used to make SSL connection. At the moment supported by cassandradb,scylladb type.',
  })
  databaseCert?: string;

  @ConfigModelProperty({
    description:
      'Base64 encoded key string used to make SSL connection. At the moment supported by cassandradb,scylladb type',
  })
  databaseCertKey?: string;

  @ConfigModelProperty({
    description:
      'Base64 encoded CA certificate string used to make SSL connection. At the moment supported by cassandradb, scylladb type.',
  })
  databaseCaCert?: string;

  @ConfigModelProperty({
    description: 'Port on which server should be running.',
    default: 8080,
    transform: new NumberTransformer(),
  })
  port?: number;

  @ConfigModelProperty({
    description:
      'Domain name of the server, eg https://authorizer.herokuapp.com.',
  })
  authorizerUrl?: string;

  @ConfigModelProperty({
    description: 'Name of cookie to be set by server.',
    default: 'authorizer'
  })
  cookieName?: string;

  @ConfigModelProperty({
    description:
      'SMTP host is used to send email verification emails and forgot password emails	false	If not set email sending can fail.',
  })
  smtpHost?: string;

  @ConfigModelProperty({
    description: 'SMTP Port is used along with SMTP host.',
  })
  smtpPort?: string;

  @ConfigModelProperty({
    description: 'Username for your smtp provider.',
  })
  smtpUsername?: string;

  @ConfigModelProperty({
    description: 'Password for your smt provider',
  })
  smtpPassword?: string;

  @ConfigModelProperty({
    description: 'Email to be used in From section while sending emails.',
  })
  senderEmail?: string;

  @ConfigModelProperty({
    description:
      'Email sender name that is displayed in the inbox instead of just showing the email address.',
  })
  senderName?: string;

  @ConfigModelProperty({
    description:
      'Reset password link, that can be used to send the correct forgot password link.',
    default: '/reset-password'
  })
  resetPasswordUrl?: string;

  @ConfigModelProperty({
    description:
      'Used to explicitly disable email and password based authentication.',
  })
  disableBasicAuthentication?: string;

  @ConfigModelProperty({
    description:
      'Used to disable the email verification while signing up.',
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
    description: 'To disable playground',
    default: true,
    transform: { transform: ({ value }) => Boolean(value === true || value === 'true') }
  })
  disablePlayground?: string;

  @ConfigModelProperty({
    description:
      'Comma separated list of roles that your platform supports.',
    default: 'user,admin'
  })
  roles?: string;

  @ConfigModelProperty({
    description:
      'Comma separated list of roles that acts as Default roles which you would like to assign to users while they signup /login.',
    default: 'user'
  })
  defaultRoles?: string;

  @ConfigModelProperty({
    description:
      'Comma separated list of roles for which signup should be disabled. Example admin roles. This roles can only assigned manually via super admin like adminUpdateProfile.',
  })
  protectedRoles?: string;

  @ConfigModelProperty({
    description: 'Claim key that will be part of JWT token.',
    default: 'role'
  })
  jwtRoleClaim?: string;

  @ConfigModelProperty({
    description:
      'Name of organization that you want on default login page.',
    default: 'Authorizer'
  })
  organizationName?: string;

  @ConfigModelProperty({
    description:
      'Logo of organization that you want on default login page.',
    default: 'Authorizer Logo'
  })
  organizationLogo?: string;

  @ConfigModelProperty({
    description:
      'Javascript function to add extra keys to your JWT id token. This feature is developed using otto and only supports writing function in ES5. Check the sample here.',
  })
  customAccessTokenScript?: string;

  @ConfigModelProperty({
    description:
      'Time interval for how long access token will be expired in 1h15m15s format.',
    default: '30m'
  })
  accessTokenExpiryTime?: string;

  @ConfigModelProperty({
    description:
      'AWS, region id, where dynamod db tables are to be created. Used with DATABASE_TYPE=dynamodb.',
  })
  awsRegion?: string;

  @ConfigModelProperty({
    description:
      'AWS access key used for connecting to dynamodb. Make sure access credentials has rights for dynamodb. Used with DATABASE_TYPE=dynamodb.',
  })
  awsAccessKeyId?: string;

  @ConfigModelProperty({
    description:
      'AWS secret access key used for connecting to dynamodb. Make sure access credentials has rights for dynamodb. Used with DATABASE_TYPE=dynamodb.',
  })
  awsSecretAccessKey?: string;

  @ConfigModelProperty({
    description:
      'Bucket used for couchbase database. Used with DATABASE_TYPE=couchbase.',
    default: 'authorizer'
  })
  couchbaseBucket?: string;

  @ConfigModelProperty({
    description:
      'RAM Quota for the bucket used for couchbase database. It has to be numeric value only. Used with DATABASE_TYPE=couchbase.',
    default: 1000,
    transform: new NumberTransformer()
  })
  couchbaseBucketRamQuota?: number;

  @ConfigModelProperty({
    description:
      'Scope in which bucket is created. Used with DATABASE_TYPE=couchbase.',
    default: '_default'
  })
  couchbaseScope?: string;

  @ConfigModelProperty({
    description: 'OAuth Google login client id.',
  })
  googleClientId?: string;

  @ConfigModelProperty({
    description: 'OAuth Google login client secret.',
  })
  googleClientSecret?: string;

  @ConfigModelProperty({
    description: 'OAuth Github login client id.',
  })
  githubClientId?: string;

  @ConfigModelProperty({
    description: 'OAuth Github login client secret.',
  })
  githubClientSecret?: string;

  @ConfigModelProperty({
    description: 'OAuth Facebook login client id.',
  })
  facebookClientId?: string;

  @ConfigModelProperty({
    description: 'OAuth Facebook login client secret.',
  })
  facebookClientSecret?: string;

  @ConfigModelProperty({
    description: 'OAuth LinkedIn login client id.',
  })
  linkedinClientId?: string;

  @ConfigModelProperty({
    description: 'OAuth LinkedIn login client secret.',
  })
  linkedinClientSecret?: string;

  @ConfigModelProperty({
    description: 'OAuth Apple login client id.',
  })
  appleClientId?: string;

  @ConfigModelProperty({
    description: 'OAuth Apple login client secret.',
  })
  appleClientSecret?: string;

  @ConfigModelProperty({
    description: 'OAuth Twitter login client id.',
  })
  twitterClientId?: string;

  @ConfigModelProperty({
    description: 'OAuth Twitter login client secret.',
  })
  twitterClientSecret?: string;

  @ConfigModelProperty({
    description: 'OAuth Microsoft login client id.',
  })
  microsoftClientId?: string;

  @ConfigModelProperty({
    description: 'OAuth Microsoft login client secret.',
  })
  microsoftClientSecret?: string;

  @ConfigModelProperty({
    description:
      'Microsoft Active Directory Tenant ID obtained from azure portal.',
  })
  microsoftActiveDirectoryTenantId?: string;
}

@EnvModel()
export class DockerComposeAuthorizerEnvironments {
  @EnvModelProperty({
    description: 'Super admin secret used to access the master data.',
  })
  @IsNotEmpty()
  adminSecret!: string;

  @EnvModelProperty({
    description:
      'Which database you are using. Supported database types are postgres, mysql, planetscale, sqlite, sqlserver, mongodb, arangodb, yugabyte, mariadb, cassandradb, scylladb, couchbase, dynamodb.',
  })
  @IsNotEmpty()
  databaseType!:
    | 'postgres'
    | 'mysql'
    | 'planetscale'
    | 'sqlite'
    | 'sqlserver'
    | 'mongodb'
    | 'arangodb'
    | 'yugabyte'
    | 'mariadb'
    | 'cassandradb'
    | 'scylladb'
    | 'couchbase'
    | 'dynamodb';

  @EnvModelProperty({
    description:
      'Database connection string. In case of cluster url eg. for cassandra db, you can use comma separated IPs.',
  })
  @IsNotEmpty()
  databaseUrl!: string;

  @EnvModelProperty({
    description:
      'Name of database to connect to. This is useful in case of arangodb and mongodb. If not set, default value will be used.',
    default: 'authorizer',
  })
  databaseName?: string;

  @EnvModelProperty({
    description:
      'Redis URL where sessions can be persisted	false	sessions will be stored in memory.',
  })
  redisUrl?: string;
}
