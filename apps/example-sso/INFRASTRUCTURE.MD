# example-sso
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

npm run docs:infrastructure:example-sso

# running the docker-compose infrastructure for example-sso
npm run docker-compose:start:example-sso

npm run serve:dev:example-sso
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

npm run docs:infrastructure:example-sso

# running the docker-compose infrastructure for example-sso
npm run docker-compose:start:example-sso

npm run start:prod:example-sso
```
## Test
```bash
npm run test:example-sso
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-sso/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-sso/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

## Feature modules

### SsoModule
NestJS SDK for Single Sign-On on NestJS and Angular with webhooks and social authorization (Wrapper for https://www.npmjs.com/package/@nestjs-mod/sso-rest-sdk)

#### Shared providers
`SsoService`

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`url`|`obj['url']`, `process.env['EXAMPLE_SSO_SSO_URL']`|**isNotEmpty** (url should not be empty)|```http://localhost:8080```|
|`adminSecret`|`obj['adminSecret']`, `process.env['EXAMPLE_SSO_SSO_ADMIN_SECRET']`|**isNotEmpty** (adminSecret should not be empty)|```adminSecret```|
|`useGuards`|`obj['useGuards']`, `process.env['EXAMPLE_SSO_SSO_USE_GUARDS']`|**optional**|```true```|
|`useFilters`|`obj['useFilters']`, `process.env['EXAMPLE_SSO_SSO_USE_FILTERS']`|**optional**|```true```|

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_SSO_PORT']`|**optional**|```3000```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_SSO_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-sso/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_SSO_POSTGRE_SQL

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-sso-postgre-sql":{"image":"bitnami/postgresql:15.5.0","container_name":"example-sso-postgre-sql","volumes":["example-sso-postgre-sql-volume:/bitnami/postgresql"],"ports":["5432:5432"],"networks":["example-sso-network"],"healthcheck":{"test":["CMD-SHELL","pg_isready -U postgres"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-sso-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-sso-postgre-sql-volume":{"name":"example-sso-postgre-sql-volume"}}```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_SSO_MINIO

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-sso-minio":{"image":"bitnami/minio:2024.2.9","container_name":"example-sso-minio","volumes":["example-sso-minio-volume:/bitnami/minio/data"],"ports":["9000:9000","9001:9001"],"networks":["example-sso-network"],"environment":{"MINIO_ROOT_USER":"FWGmrAGaeMKM","MINIO_ROOT_PASSWORD":"QatVJuLoZRARlJguoZMpoKvZMJHzvuOR"},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","nginxBucketsLocations","nginxConfigContent","nginxConfigFolder","nginxLogsFolder"],"healthcheck":{"test":["CMD-SHELL","mc","ready","local"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-sso-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-sso-minio-volume":{"name":"example-sso-minio-volume"}}```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_SSO_REDIS

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-sso-redis":{"image":"bitnami/redis:7.2","container_name":"example-sso-redis","volumes":["example-sso-redis-volume:/bitnami/redis/data"],"ports":["6379:6379"],"networks":["example-sso-network"],"environment":{"REDIS_DATABASE":"0","REDIS_PASSWORD":"CHmeOQrZWUHwgahrfzsrzuREOxgAENsC","REDIS_DISABLE_COMMANDS":"FLUSHDB,FLUSHALL","REDIS_IO_THREADS":2,"REDIS_IO_THREADS_DO_READS":"yes"},"keysOfEnvironmentsWithStaticValue":["disableCommands","featureName","image","ioThreads","ioThreadsDoReads","networks"],"healthcheck":{"test":["CMD-SHELL","redis-cli --no-auth-warning -a $$REDIS_PASSWORD ping | grep PONG"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-sso-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-sso-redis-volume":{"name":"example-sso-redis-volume"}}```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_SSO_SINGLE_SIGN_ON

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-sso-single-sign-on":{"image":"ghcr.io/nestjs-mod/nestjs-mod-sso-server:1.5.5","container_name":"example-sso-single-sign-on","ports":["8080:8080"],"networks":["example-sso-network"],"excludeContainerNameFromEnvironmentName":true,"environment":{"DATABASE_URL":"postgres://postgres:postgres_password@example-sso-postgre-sql:5432/postgres?schema=public","SINGLE_SIGN_ON_SSO_ADMIN_SECRET":"adminSecret","SINGLE_SIGN_ON_SSO_ADMIN_EMAIL":"nestjs-mod-sso@site15.ru","SINGLE_SIGN_ON_SSO_ADMIN_USERNAME":"admin","SINGLE_SIGN_ON_SSO_ADMIN_PASSWORD":"SbxcbII7RUvCOe9TDXnKhfRrLJW5cGDA","SINGLE_SIGN_ON_MINIO_SERVER_HOST":"example-sso-minio","SINGLE_SIGN_ON_MINIO_ACCESS_KEY":"FWGmrAGaeMKM","SINGLE_SIGN_ON_MINIO_SECRET_KEY":"QatVJuLoZRARlJguoZMpoKvZMJHzvuOR","SINGLE_SIGN_ON_KEYV_URL":"redis://:CHmeOQrZWUHwgahrfzsrzuREOxgAENsC@example-sso-redis:6379","SINGLE_SIGN_ON_SSO_DEFAULT_PUBLIC_PROJECTS":"Beijing:ru=Пекин,Jq6GQ6Rzz6x8HNOD4x2Hc2eM0cfiCVUzGfsi,X6nk0OZXQJboSEfugnH35e9oSeg5RFlV0DQprtYyYDQjNli9mA;Moscow:ru=Москва,OceX08HGZ89PTkPpg9KDk5ErY1uMfDcfFKkw,VJztpDIwvqG6IkTVEIDEw1Ed2Wu5oHu6zfBe7CCJFrCtyWO2Yv;New York:ru=Нью-Йорк,4OGD25Rmn3W3MP0kMd7c90rGP1WwK8u4wL1w,qm8nc9MgKyvd6Hgl3jY5BjgDFSBqNvxcu6o52kDjIC168OsM1R;","SINGLE_SIGN_ON_SSO_DEFAULT_PROJECT":"default:ru=по умолчанию,KzMRNEZTetzatIgQPVSDYfeGyaZrbLzkcxNc,qaHkVpAtUVIpDdLXMlAOzsBfMRJblWoHpXguYQRBuSEBpGKbWt","SINGLE_SIGN_ON_SSO_DISABLE_EMAIL_VERIFICATION":false,"SINGLE_SIGN_ON_SSO_SERVER_URL":"http://localhost:8080","SINGLE_SIGN_ON_SSO_CLIENT_URL":"http://localhost:8080","SINGLE_SIGN_ON_PORT":8080,"SINGLE_SIGN_ON_SSO_USER_AVAILABLE_ROLES":["admin","manager","user"],"SINGLE_SIGN_ON_SSO_USER_DEFAULT_ROLES":["user"],"SINGLE_SIGN_ON_SSO_ADMIN_DEFAULT_ROLES":["admin"],"SINGLE_SIGN_ON_SSO_MANAGER_DEFAULT_ROLES":["manager"],"SINGLE_SIGN_ON_SSO_JWT_SECRET_KEY":"AcJwUY9AP6FPf8XnfwbSuW7ZjwoaPiFJ","SINGLE_SIGN_ON_SSO_JWT_ACCESS_TOKEN_EXPIRES_IN":"30m","SINGLE_SIGN_ON_SSO_JWT_REFRESH_TOKEN_EXPIRES_IN":"24h","SINGLE_SIGN_ON_SSO_CACHE_TTL":"15000","IMAGE":"ghcr.io/nestjs-mod/nestjs-mod-sso-server:1.5.5","EXTERNAL_CLIENT_PORT":8080},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","dependsOnServiceNames","env"],"tty":true,"restart":"always","depends_on":{}}}```|
|`networks`|**optional**|```{"example-sso-network":{"driver":"bridge"}}```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-sso/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposeMinio
MinIO is a high-performance, S3 compatible object storage. (Generator for minio in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`minioRootUser`|`obj['minioRootUser']`, `process.env['EXAMPLE_SSO_MINIO_ROOT_USER']`|**isNotEmpty** (minioRootUser should not be empty)|```FWGmrAGaeMKM```|
|`minioRootPassword`|`obj['minioRootPassword']`, `process.env['EXAMPLE_SSO_MINIO_ROOT_PASSWORD']`|**isNotEmpty** (minioRootPassword should not be empty)|```QatVJuLoZRARlJguoZMpoKvZMJHzvuOR```|

### DockerComposePostgreSQL
PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`rootDatabaseUrl`|`obj['rootDatabaseUrl']`, `process.env['EXAMPLE_SSO_ROOT_DATABASE_URL']`|**isNotEmpty** (rootDatabaseUrl should not be empty)|```postgres://postgres:postgres_password@localhost:5432/postgres?schema=public```|

#### Feature environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_SSO_FEATURE_MODULE_NAME_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|

### DockerComposeRedis
The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`redisUrl`|`obj['redisUrl']`, `process.env['EXAMPLE_SSO_REDIS_URL']`|**isNotEmpty** (redisUrl should not be empty)|```redis://:CHmeOQrZWUHwgahrfzsrzuREOxgAENsC@localhost:6379```|

### DockerComposeSso
Single Sign-On on NestJS and Angular with webhooks and social authorization. (Generator for https://github.com/nestjs-mod/nestjs-mod-sso in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_SSO_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://postgres:postgres_password@example-sso-postgre-sql:5432/postgres?schema=public```|
|`singleSignOnPort`|`obj['singleSignOnPort']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_PORT']`|**optional**|```8080```|
|`singleSignOnKeyvUrl`|`obj['singleSignOnKeyvUrl']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_KEYV_URL']`|**isNotEmpty** (singleSignOnKeyvUrl should not be empty)|```redis://:CHmeOQrZWUHwgahrfzsrzuREOxgAENsC@example-sso-redis:6379```|
|`singleSignOnMinioServerHost`|`obj['singleSignOnMinioServerHost']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_MINIO_SERVER_HOST']`|**isNotEmpty** (singleSignOnMinioServerHost should not be empty)|```example-sso-minio```|
|`singleSignOnMinioAccessKey`|`obj['singleSignOnMinioAccessKey']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_MINIO_ACCESS_KEY']`|**isNotEmpty** (singleSignOnMinioAccessKey should not be empty)|```FWGmrAGaeMKM```|
|`singleSignOnMinioSecretKey`|`obj['singleSignOnMinioSecretKey']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_MINIO_SECRET_KEY']`|**isNotEmpty** (singleSignOnMinioSecretKey should not be empty)|```QatVJuLoZRARlJguoZMpoKvZMJHzvuOR```|
|`singleSignOnNotificationsMailTransport`|`obj['singleSignOnNotificationsMailTransport']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_NOTIFICATIONS_MAIL_TRANSPORT']`|**optional**|-|
|`singleSignOnNotificationsMailDefaultSenderName`|`obj['singleSignOnNotificationsMailDefaultSenderName']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_NOTIFICATIONS_MAIL_DEFAULT_SENDER_NAME']`|**optional**|-|
|`singleSignOnNotificationsMailDefaultSenderEmail`|`obj['singleSignOnNotificationsMailDefaultSenderEmail']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_NOTIFICATIONS_MAIL_DEFAULT_SENDER_EMAIL']`|**optional**|-|
|`singleSignOnSsoServerUrl`|`obj['singleSignOnSsoServerUrl']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_SERVER_URL']`|**isNotEmpty** (singleSignOnSsoServerUrl should not be empty)|```http://localhost:8080```|
|`singleSignOnSsoClientUrl`|`obj['singleSignOnSsoClientUrl']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_CLIENT_URL']`|**isNotEmpty** (singleSignOnSsoClientUrl should not be empty)|```http://localhost:8080```|
|`singleSignOnSsoAdminSecret`|`obj['singleSignOnSsoAdminSecret']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_ADMIN_SECRET']`|**optional**|```adminSecret```|
|`singleSignOnSsoAdminEmail`|`obj['singleSignOnSsoAdminEmail']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_ADMIN_EMAIL']`|**optional**|```nestjs-mod-sso@site15.ru```|
|`singleSignOnSsoAdminUsername`|`obj['singleSignOnSsoAdminUsername']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_ADMIN_USERNAME']`|**isNotEmpty** (singleSignOnSsoAdminUsername should not be empty)|```admin```|
|`singleSignOnSsoAdminPassword`|`obj['singleSignOnSsoAdminPassword']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_ADMIN_PASSWORD']`|**optional**|```SbxcbII7RUvCOe9TDXnKhfRrLJW5cGDA```|
|`singleSignOnSsoUserAvailableRoles`|`obj['singleSignOnSsoUserAvailableRoles']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_USER_AVAILABLE_ROLES']`|**optional**|[ ```admin```, ```manager```, ```user``` ]|
|`singleSignOnSsoUserDefaultRoles`|`obj['singleSignOnSsoUserDefaultRoles']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_USER_DEFAULT_ROLES']`|**optional**|[ ```user``` ]|
|`singleSignOnSsoAdminDefaultRoles`|`obj['singleSignOnSsoAdminDefaultRoles']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_ADMIN_DEFAULT_ROLES']`|**optional**|[ ```admin``` ]|
|`singleSignOnSsoManagerDefaultRoles`|`obj['singleSignOnSsoManagerDefaultRoles']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_MANAGER_DEFAULT_ROLES']`|**optional**|[ ```manager``` ]|
|`singleSignOnSsoJwtSecretKey`|`obj['singleSignOnSsoJwtSecretKey']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_JWT_SECRET_KEY']`|**optional**|```AcJwUY9AP6FPf8XnfwbSuW7ZjwoaPiFJ```|
|`singleSignOnSsoJwtAccessTokenExpiresIn`|`obj['singleSignOnSsoJwtAccessTokenExpiresIn']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_JWT_ACCESS_TOKEN_EXPIRES_IN']`|**optional**|```30m```|
|`singleSignOnSsoJwtRefreshTokenExpiresIn`|`obj['singleSignOnSsoJwtRefreshTokenExpiresIn']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_JWT_REFRESH_TOKEN_EXPIRES_IN']`|**optional**|```24h```|
|`singleSignOnSsoCacheTTL`|`obj['singleSignOnSsoCacheTTL']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_CACHE_TTL']`|**optional**|```15000```|
|`singleSignOnSsoDefaultPublicProjects`|`obj['singleSignOnSsoDefaultPublicProjects']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_DEFAULT_PUBLIC_PROJECTS']`|**optional**|```Beijing:ru=Пекин,Jq6GQ6Rzz6x8HNOD4x2Hc2eM0cfiCVUzGfsi,X6nk0OZXQJboSEfugnH35e9oSeg5RFlV0DQprtYyYDQjNli9mA;Moscow:ru=Москва,OceX08HGZ89PTkPpg9KDk5ErY1uMfDcfFKkw,VJztpDIwvqG6IkTVEIDEw1Ed2Wu5oHu6zfBe7CCJFrCtyWO2Yv;New York:ru=Нью-Йорк,4OGD25Rmn3W3MP0kMd7c90rGP1WwK8u4wL1w,qm8nc9MgKyvd6Hgl3jY5BjgDFSBqNvxcu6o52kDjIC168OsM1R;```|
|`singleSignOnSsoDefaultProject`|`obj['singleSignOnSsoDefaultProject']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_DEFAULT_PROJECT']`|**optional**|```default:ru=по умолчанию,KzMRNEZTetzatIgQPVSDYfeGyaZrbLzkcxNc,qaHkVpAtUVIpDdLXMlAOzsBfMRJblWoHpXguYQRBuSEBpGKbWt```|
|`singleSignOnSsoDisableEmailVerification`|`obj['singleSignOnSsoDisableEmailVerification']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_DISABLE_EMAIL_VERIFICATION']`|**optional**|```false```|
|`singleSignOnSsoGoogleOauthClientId`|`obj['singleSignOnSsoGoogleOauthClientId']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_GOOGLE_OAUTH_CLIENT_ID']`|**optional**|-|
|`singleSignOnSsoGoogleOauthClientSecretKey`|`obj['singleSignOnSsoGoogleOauthClientSecretKey']`, `process.env['EXAMPLE_SSO_SINGLE_SIGN_ON_SSO_GOOGLE_OAUTH_CLIENT_SECRET_KEY']`|**optional**|-|
