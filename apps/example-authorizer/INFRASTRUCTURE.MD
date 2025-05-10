# example-authorizer
> Version: 0.0.0

A collection of modules unified for NestJS-mod
## Installation
```bash
git clone https://github.com/nestjs-mod/nestjs-mod-contrib.git
cd nestjs-mod-contrib
npm install
```
## Running the app in watch mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

npm run docs:infrastructure:example-authorizer

# running the docker-compose infrastructure for example-authorizer
npm run docker-compose:start:example-authorizer

npm run serve:dev:example-authorizer
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

npm run docs:infrastructure:example-authorizer

# running the docker-compose infrastructure for example-authorizer
npm run docker-compose:start:example-authorizer

npm run start:prod:example-authorizer
```
## Test
```bash
npm run test:example-authorizer
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-authorizer/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-authorizer/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

## Feature modules

### AuthorizerModule
NestJS SDK for Authorizer API

#### Shared providers
`AuthorizerService`

#### Environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`clientId`|`obj['clientId']`, `process.env['EXAMPLE_AUTHORIZER_AUTHORIZER_CLIENT_ID']`|**optional**|-|
|`authorizerURL`|`obj['authorizerURL']`, `process.env['EXAMPLE_AUTHORIZER_AUTHORIZER_AUTHORIZER_URL']`|**isNotEmpty** (authorizerURL should not be empty)|```http://localhost:8080```|
|`redirectURL`|`obj['redirectURL']`, `process.env['EXAMPLE_AUTHORIZER_AUTHORIZER_REDIRECT_URL']`|**isNotEmpty** (redirectURL should not be empty)|```http://localhost:3000```|
|`adminSecret`|`obj['adminSecret']`, `process.env['EXAMPLE_AUTHORIZER_AUTHORIZER_ADMIN_SECRET']`|**optional**|```adminSecret```|
|`allowedExternalAppIds`|`obj['allowedExternalAppIds']`, `process.env['EXAMPLE_AUTHORIZER_AUTHORIZER_ALLOWED_EXTERNAL_APP_IDS']`|**optional**|-|

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_AUTHORIZER_PORT']`|**optional**|```3000```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_AUTHORIZER_HOSTNAME']`|**optional**|-|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`mode`|**optional**|```silent```|

## Infrastructure modules

### DockerCompose
Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose)

#### Shared providers
`ManualDockerComposeFeatures`

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-authorizer/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_AUTHORIZER_POSTGRE_SQL

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-authorizer-postgre-sql":{"image":"bitnami/postgresql:15.5.0","container_name":"example-authorizer-postgre-sql","volumes":["example-authorizer-postgre-sql-volume:/bitnami/postgresql"],"ports":["5432:5432"],"networks":["example-authorizer-network"],"healthcheck":{"test":["CMD-SHELL","pg_isready -U postgres"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-authorizer-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-authorizer-postgre-sql-volume":{"name":"example-authorizer-postgre-sql-volume"}}```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_AUTHORIZER_AUTHORIZER

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-authorizer-authorizer":{"image":"lakhansamani/authorizer:1.3.8","container_name":"example-authorizer-authorizer","ports":["8080:8080"],"networks":["example-authorizer-network"],"environment":{"DATABASE_TYPE":"postgres","DATABASE_URL":"postgres://postgres:postgres_password@example-authorizer-postgre-sql:5432/postgres","DATABASE_NAME":"authorizer","ADMIN_SECRET":"adminSecret","PORT":8080,"COOKIE_NAME":"authorizer","DISABLE_PLAYGROUND":true,"ACCESS_TOKEN_EXPIRY_TIME":"30m","IMAGE":"lakhansamani/authorizer:1.3.8","EXTERNAL_CLIENT_PORT":8080,"ENV":"production","RESET_PASSWORD_URL":"/reset-password","ROLES":"user,admin","DEFAULT_ROLES":"user","JWT_ROLE_CLAIM":"role","ORGANIZATION_NAME":"Authorizer","ORGANIZATION_LOGO":"Authorizer Logo","COUCHBASE_BUCKET":"authorizer","COUCHBASE_BUCKET_RAM_QUOTA":1000,"COUCHBASE_SCOPE":"_default"},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","dependsOnServiceNames","env"],"tty":true,"restart":"always","depends_on":{}}}```|
|`networks`|**optional**|```{"example-authorizer-network":{"driver":"bridge"}}```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-authorizer/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposePostgreSQL
PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`rootDatabaseUrl`|`obj['rootDatabaseUrl']`, `process.env['EXAMPLE_AUTHORIZER_ROOT_DATABASE_URL']`|**isNotEmpty** (rootDatabaseUrl should not be empty)|```postgres://postgres:postgres_password@localhost:5432/postgres?schema=public```|

#### Feature environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_AUTHORIZER_FEATURE_MODULE_NAME_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|

### DockerComposeAuthorizer
Authorizer is an open-source authentication and authorization solution for your applications. Bring your database and have complete control over the user information. You can self-host authorizer instances and connect to supported databases. (Generator for https://authorizer.dev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`adminSecret`|`obj['adminSecret']`, `process.env['EXAMPLE_AUTHORIZER_ADMIN_SECRET']`|**isNotEmpty** (adminSecret should not be empty)|```adminSecret```|
|`databaseType`|`obj['databaseType']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_TYPE']`|**isNotEmpty** (databaseType should not be empty)|```postgres```|
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://postgres:postgres_password@example-authorizer-postgre-sql:5432/postgres```|
|`databaseName`|`obj['databaseName']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_NAME']`|**optional**|```authorizer```|
|`redisUrl`|`obj['redisUrl']`, `process.env['EXAMPLE_AUTHORIZER_REDIS_URL']`|**optional**|-|
|`databasePort`|`obj['databasePort']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_PORT']`|**optional**|-|
|`databaseHost`|`obj['databaseHost']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_HOST']`|**optional**|-|
|`databaseUsername`|`obj['databaseUsername']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_USERNAME']`|**optional**|-|
|`databasePassword`|`obj['databasePassword']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_PASSWORD']`|**optional**|-|
|`databaseCert`|`obj['databaseCert']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_CERT']`|**optional**|-|
|`databaseCertKey`|`obj['databaseCertKey']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_CERT_KEY']`|**optional**|-|
|`databaseCaCert`|`obj['databaseCaCert']`, `process.env['EXAMPLE_AUTHORIZER_DATABASE_CA_CERT']`|**optional**|-|
|`port`|`obj['port']`, `process.env['EXAMPLE_AUTHORIZER_PORT']`|**optional**|```8080```|
|`authorizerUrl`|`obj['authorizerUrl']`, `process.env['EXAMPLE_AUTHORIZER_AUTHORIZER_URL']`|**optional**|-|
|`cookieName`|`obj['cookieName']`, `process.env['EXAMPLE_AUTHORIZER_COOKIE_NAME']`|**optional**|```authorizer```|
|`smtpHost`|`obj['smtpHost']`, `process.env['EXAMPLE_AUTHORIZER_SMTP_HOST']`|**optional**|-|
|`smtpPort`|`obj['smtpPort']`, `process.env['EXAMPLE_AUTHORIZER_SMTP_PORT']`|**optional**|-|
|`smtpUsername`|`obj['smtpUsername']`, `process.env['EXAMPLE_AUTHORIZER_SMTP_USERNAME']`|**optional**|-|
|`smtpPassword`|`obj['smtpPassword']`, `process.env['EXAMPLE_AUTHORIZER_SMTP_PASSWORD']`|**optional**|-|
|`senderEmail`|`obj['senderEmail']`, `process.env['EXAMPLE_AUTHORIZER_SENDER_EMAIL']`|**optional**|-|
|`senderName`|`obj['senderName']`, `process.env['EXAMPLE_AUTHORIZER_SENDER_NAME']`|**optional**|-|
|`disablePlayground`|`obj['disablePlayground']`, `process.env['EXAMPLE_AUTHORIZER_DISABLE_PLAYGROUND']`|**optional**|```true```|
|`accessTokenExpiryTime`|`obj['accessTokenExpiryTime']`, `process.env['EXAMPLE_AUTHORIZER_ACCESS_TOKEN_EXPIRY_TIME']`|**optional**|```30m```|
|`awsAccessKeyId`|`obj['awsAccessKeyId']`, `process.env['EXAMPLE_AUTHORIZER_AWS_ACCESS_KEY_ID']`|**optional**|-|
|`awsSecretAccessKey`|`obj['awsSecretAccessKey']`, `process.env['EXAMPLE_AUTHORIZER_AWS_SECRET_ACCESS_KEY']`|**optional**|-|
|`googleClientId`|`obj['googleClientId']`, `process.env['EXAMPLE_AUTHORIZER_GOOGLE_CLIENT_ID']`|**optional**|-|
|`googleClientSecret`|`obj['googleClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_GOOGLE_CLIENT_SECRET']`|**optional**|-|
|`githubClientId`|`obj['githubClientId']`, `process.env['EXAMPLE_AUTHORIZER_GITHUB_CLIENT_ID']`|**optional**|-|
|`githubClientSecret`|`obj['githubClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_GITHUB_CLIENT_SECRET']`|**optional**|-|
|`facebookClientId`|`obj['facebookClientId']`, `process.env['EXAMPLE_AUTHORIZER_FACEBOOK_CLIENT_ID']`|**optional**|-|
|`facebookClientSecret`|`obj['facebookClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_FACEBOOK_CLIENT_SECRET']`|**optional**|-|
|`linkedinClientId`|`obj['linkedinClientId']`, `process.env['EXAMPLE_AUTHORIZER_LINKEDIN_CLIENT_ID']`|**optional**|-|
|`linkedinClientSecret`|`obj['linkedinClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_LINKEDIN_CLIENT_SECRET']`|**optional**|-|
|`appleClientId`|`obj['appleClientId']`, `process.env['EXAMPLE_AUTHORIZER_APPLE_CLIENT_ID']`|**optional**|-|
|`appleClientSecret`|`obj['appleClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_APPLE_CLIENT_SECRET']`|**optional**|-|
|`twitterClientId`|`obj['twitterClientId']`, `process.env['EXAMPLE_AUTHORIZER_TWITTER_CLIENT_ID']`|**optional**|-|
|`twitterClientSecret`|`obj['twitterClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_TWITTER_CLIENT_SECRET']`|**optional**|-|
|`microsoftClientId`|`obj['microsoftClientId']`, `process.env['EXAMPLE_AUTHORIZER_MICROSOFT_CLIENT_ID']`|**optional**|-|
|`microsoftClientSecret`|`obj['microsoftClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_MICROSOFT_CLIENT_SECRET']`|**optional**|-|
|`microsoftActiveDirectoryTenantId`|`obj['microsoftActiveDirectoryTenantId']`, `process.env['EXAMPLE_AUTHORIZER_MICROSOFT_ACTIVE_DIRECTORY_TENANT_ID']`|**optional**|-|
|`smtpLocalName`|`obj['smtpLocalName']`, `process.env['EXAMPLE_AUTHORIZER_SMTP_LOCAL_NAME']`|**optional**|-|
|`jwtSecret`|`obj['jwtSecret']`, `process.env['EXAMPLE_AUTHORIZER_JWT_SECRET']`|**optional**|-|
|`jwtPrivateKey`|`obj['jwtPrivateKey']`, `process.env['EXAMPLE_AUTHORIZER_JWT_PRIVATE_KEY']`|**optional**|-|
|`jwtPublicKey`|`obj['jwtPublicKey']`, `process.env['EXAMPLE_AUTHORIZER_JWT_PUBLIC_KEY']`|**optional**|-|
|`appUrl`|`obj['appUrl']`, `process.env['EXAMPLE_AUTHORIZER_APP_URL']`|**optional**|-|
|`discordClientId`|`obj['discordClientId']`, `process.env['EXAMPLE_AUTHORIZER_DISCORD_CLIENT_ID']`|**optional**|-|
|`discordClientSecret`|`obj['discordClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_DISCORD_CLIENT_SECRET']`|**optional**|-|
|`twitchClientId`|`obj['twitchClientId']`, `process.env['EXAMPLE_AUTHORIZER_TWITCH_CLIENT_ID']`|**optional**|-|
|`twitchClientSecret`|`obj['twitchClientSecret']`, `process.env['EXAMPLE_AUTHORIZER_TWITCH_CLIENT_SECRET']`|**optional**|-|
|`clientId`|`obj['clientId']`, `process.env['EXAMPLE_AUTHORIZER_CLIENT_ID']`|**optional**|-|
|`clientSecret`|`obj['clientSecret']`, `process.env['EXAMPLE_AUTHORIZER_CLIENT_SECRET']`|**optional**|-|
|`encryptionKey`|`obj['encryptionKey']`, `process.env['EXAMPLE_AUTHORIZER_ENCRYPTION_KEY']`|**optional**|-|
|`isProd`|`obj['isProd']`, `process.env['EXAMPLE_AUTHORIZER_IS_PROD']`|**optional**|-|
|`allowedOrigins`|`obj['allowedOrigins']`, `process.env['EXAMPLE_AUTHORIZER_ALLOWED_ORIGINS']`|**optional**|-|
|`twilioApiKey`|`obj['twilioApiKey']`, `process.env['EXAMPLE_AUTHORIZER_TWILIO_API_KEY']`|**optional**|-|
|`twilioApiSecret`|`obj['twilioApiSecret']`, `process.env['EXAMPLE_AUTHORIZER_TWILIO_API_SECRET']`|**optional**|-|
|`twilioAccountSid`|`obj['twilioAccountSid']`, `process.env['EXAMPLE_AUTHORIZER_TWILIO_ACCOUNT_SID']`|**optional**|-|
|`twilioSender`|`obj['twilioSender']`, `process.env['EXAMPLE_AUTHORIZER_TWILIO_SENDER']`|**optional**|-|
