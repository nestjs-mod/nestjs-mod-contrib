# prisma
> Version: 0.0.0

Example application with PM2, docker-compose, postgres and prisma
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

# running the docker-compose infrastructure for prisma
npm run docker-compose:start:prisma

# creation all databases of applications and modules
npm run db:create

# applying migrations for example-prisma
npm run prisma:migrate-deploy:example-prisma

# running example-prisma application source code in watch mode
npm run serve:dev:example-prisma
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# running the docker-compose infrastructure for prisma
npm run docker-compose:start:prisma

# creation all databases of applications and modules
npm run db:create

# applying migrations for example-prisma
npm run prisma:migrate-deploy:example-prisma

# launching example-prisma application (you must first build it using the build command)
npm run start:prod:example-prisma
```
## Test
```bash
# running tests for example-prisma
npm run test:example-prisma
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-prisma/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`bufferLogs`|**optional**|```true```|

### NestjsPinoLoggerModule
Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino)

### TerminusHealthCheckModule
Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)

#### Shared providers
`TerminusHealthCheckService`

#### Shared imports
`TerminusModule`

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`standardHealthIndicators`|**optional**|[ ```{"name":"memory_heap"}``` ]|

## Core modules

### PrismaModule
Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version only for Postgres)

#### Shared providers
`PrismaClientFactoryService`, `PrismaClient`

#### Environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['PRISMA_PRISMA_USER_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://prisma_user:prisma_user_password@localhost:5432/prisma_user?schema=public```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`prismaModule`|**optional**|```{}```|
|`featureName`|**optional**|```prisma-user```|
|`schemaFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-prisma/src/prisma/prisma-user-schema.prisma```|
|`binaryTargets`|**optional**|[ ```native```, ```linux-musl-openssl-3.0.x```, ```linux-musl-openssl-3.0.x``` ]|

## Feature modules

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['PRISMA_PORT']`|**optional**|```3003```|
|`hostname`|`obj['hostname']`, `process.env['PRISMA_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-prisma/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: PRISMA_POSTGRE_SQL

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"prisma-postgre-sql":{"image":"bitnami/postgresql:15.5.0","container_name":"prisma-postgre-sql","volumes":["prisma-postgre-sql-volume:/bitnami/postgresql"],"ports":["5432:5432"],"networks":["prisma-network"],"healthcheck":{"test":["CMD-SHELL","pg_isready -U postgres"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"prisma-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"prisma-postgre-sql-volume":{"name":"prisma-postgre-sql-volume"}}```|

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Generator ecosystem.config.json for https://www.npmjs.com/package/pm2)

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`ecosystemConfigFile`|**isNotEmpty** (ecosystemConfigFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/ecosystem.config.json```|
|`applicationScriptFile`|**isNotEmpty** (applicationScriptFile should not be empty)|```dist/apps/example-prisma/main.js```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-prisma/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposePostgreSQL
PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`rootDatabaseUrl`|`obj['rootDatabaseUrl']`, `process.env['PRISMA_ROOT_DATABASE_URL']`|**isNotEmpty** (rootDatabaseUrl should not be empty)|```postgres://postgres:postgres_password@localhost:5432/postgres?schema=public```|

#### Feature environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['PRISMA_FEATURE_MODULE_NAME_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|

#### Modules that use feature environments
##### Feature module name: prisma-user

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['PRISMA_PRISMA_USER_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://prisma_user:prisma_user_password@localhost:5432/prisma_user?schema=public```|
