import { BooleanTransformer, EnvModel, EnvModelProperty, NumberTransformer } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

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
    description: 'Redis URL where sessions can be persisted	false	sessions will be stored in memory.',
  })
  redisUrl?: string;

  //

  @EnvModelProperty({
    hidden: true,
    description:
      'Port on which database connection should be made. This is used when DATABASE_URL is not mentioned. At the moment supported by cassandradb.',
  })
  databasePort?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'Host/IP on which database connection should be made. This is used when DATABASE_URL is not mentioned. At the moment supported by cassandradb type.',
  })
  databaseHost?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'Username for the database access with permission to create tables and records. At the moment supported by cassandradb, scylladb type.',
  })
  databaseUsername?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'Password for the database access with permission to create tables and records. At the moment supported by cassandradb, scylladb type.',
  })
  databasePassword?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'Base64 encoded certificate string used to make SSL connection. At the moment supported by cassandradb,scylladb type.',
  })
  databaseCert?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'Base64 encoded key string used to make SSL connection. At the moment supported by cassandradb,scylladb type',
  })
  databaseCertKey?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'Base64 encoded CA certificate string used to make SSL connection. At the moment supported by cassandradb, scylladb type.',
  })
  databaseCaCert?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Port on which server should be running.',
    default: 8080,
    transform: new NumberTransformer(),
  })
  port?: number;

  @EnvModelProperty({
    hidden: true,
    description: 'Domain name of the server, eg https://authorizer.herokuapp.com.',
  })
  authorizerUrl?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Name of cookie to be set by server.',
    default: 'authorizer',
  })
  cookieName?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'SMTP host is used to send email verification emails and forgot password emails	false	If not set email sending can fail.',
  })
  smtpHost?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'SMTP Port is used along with SMTP host.',
  })
  smtpPort?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Username for your smtp provider.',
  })
  smtpUsername?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Password for your smt provider',
  })
  smtpPassword?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Email to be used in From section while sending emails.',
  })
  senderEmail?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Email sender name that is displayed in the inbox instead of just showing the email address.',
  })
  senderName?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'To disable playground',
    default: true,
    transform: new BooleanTransformer(),
  })
  disablePlayground?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Time interval for how long access token will be expired in 1h15m15s format.',
    default: '30m',
  })
  accessTokenExpiryTime?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'AWS access key used for connecting to dynamodb. Make sure access credentials has rights for dynamodb. Used with DATABASE_TYPE=dynamodb.',
  })
  awsAccessKeyId?: string;

  @EnvModelProperty({
    hidden: true,
    description:
      'AWS secret access key used for connecting to dynamodb. Make sure access credentials has rights for dynamodb. Used with DATABASE_TYPE=dynamodb.',
  })
  awsSecretAccessKey?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Google login client id.',
  })
  googleClientId?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Google login client secret.',
  })
  googleClientSecret?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Github login client id.',
  })
  githubClientId?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Github login client secret.',
  })
  githubClientSecret?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Facebook login client id.',
  })
  facebookClientId?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Facebook login client secret.',
  })
  facebookClientSecret?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth LinkedIn login client id.',
  })
  linkedinClientId?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth LinkedIn login client secret.',
  })
  linkedinClientSecret?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Apple login client id.',
  })
  appleClientId?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Apple login client secret.',
  })
  appleClientSecret?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Twitter login client id.',
  })
  twitterClientId?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Twitter login client secret.',
  })
  twitterClientSecret?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Microsoft login client id.',
  })
  microsoftClientId?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'OAuth Microsoft login client secret.',
  })
  microsoftClientSecret?: string;

  @EnvModelProperty({
    hidden: true,
    description: 'Microsoft Active Directory Tenant ID obtained from azure portal.',
  })
  microsoftActiveDirectoryTenantId?: string;

  // un documented
  // https://github.com/authorizerdev/authorizer/blob/27b51ad36918b922934d8dd47f72e6fbefca5dcb/server/constants/env.go

  @EnvModelProperty({ hidden: true })
  smtpLocalName!: string;

  @EnvModelProperty({ hidden: true })
  jwtSecret!: string;

  @EnvModelProperty({ hidden: true })
  jwtPrivateKey!: string;

  @EnvModelProperty({ hidden: true })
  jwtPublicKey!: string;

  @EnvModelProperty({ hidden: true })
  appUrl!: string;

  @EnvModelProperty({ hidden: true })
  discordClientId!: string;

  @EnvModelProperty({ hidden: true })
  discordClientSecret!: string;

  @EnvModelProperty({ hidden: true })
  twitchClientId!: string;

  @EnvModelProperty({ hidden: true })
  twitchClientSecret!: string;

  @EnvModelProperty({ hidden: true })
  clientId!: string;

  @EnvModelProperty({ hidden: true })
  clientSecret!: string;

  @EnvModelProperty({ hidden: true })
  encryptionKey!: string;

  @EnvModelProperty({ hidden: true })
  isProd!: string;

  @EnvModelProperty({ hidden: true })
  allowedOrigins!: string;

  @EnvModelProperty({ hidden: true })
  twilioApiKey!: string;

  @EnvModelProperty({ hidden: true })
  twilioApiSecret!: string;

  @EnvModelProperty({ hidden: true })
  twilioAccountSid!: string;

  @EnvModelProperty({ hidden: true })
  twilioSender!: string;
}
