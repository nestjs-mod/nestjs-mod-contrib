# example-pg-prisma-pg-flyway
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

# generation of client prisma schema of all applications and modules
npm run prisma:generate

# running the docker-compose infrastructure for example-pg-prisma-pg-flyway
npm run docker-compose:start:example-pg-prisma-pg-flyway

# creation all databases of applications and modules
npm run db:create

# applying migrations for example-pg-prisma-pg-flyway
npm run pg-flyway:migrate:example-pg-prisma-pg-flyway

# generating a prisma schema based on a database for example-pg-prisma-pg-flyway
npm run prisma:pull:example-pg-prisma-pg-flyway

# generation of client prisma schema of all applications and modules
npm run prisma:generate

npm run serve:dev:example-pg-prisma-pg-flyway
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# generation of client prisma schema of all applications and modules
npm run prisma:generate

# running the docker-compose infrastructure for example-pg-prisma-pg-flyway
npm run docker-compose:start:example-pg-prisma-pg-flyway

# creation all databases of applications and modules
npm run db:create

# applying migrations for example-pg-prisma-pg-flyway
npm run pg-flyway:migrate:example-pg-prisma-pg-flyway

# generating a prisma schema based on a database for example-pg-prisma-pg-flyway
npm run prisma:pull:example-pg-prisma-pg-flyway

# generation of client prisma schema of all applications and modules
npm run prisma:generate

npm run start:prod:example-pg-prisma-pg-flyway
```
## Test
```bash
npm run test:example-pg-prisma-pg-flyway
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pg-prisma-pg-flyway/package.json```|
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
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://feat_pg_flyway:feat_pg_flyway_password@localhost:5432/feat_pg_flyway?schema=public```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```pg-flyway-pg-prisma```|
|`schemaFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pg-prisma-pg-flyway/src/prisma/pg-flyway-pg-prisma-schema.prisma```|
|`addMigrationScripts`|**optional**|```false```|
|`previewFeatures`|**optional**|[ ```driverAdapters``` ]|
|`prismaClientFactory`|**optional**|```prismaClientFactory```|

## Feature modules

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_PG_PRISMA_PG_FLYWAY_PORT']`|**optional**|```3000```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_PG_PRISMA_PG_FLYWAY_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pg-prisma-pg-flyway/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_PG_PRISMA_PG_FLYWAY_POSTGRE_SQL

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-pg-prisma-pg-flyway-postgre-sql":{"image":"bitnami/postgresql:15.5.0","container_name":"example-pg-prisma-pg-flyway-postgre-sql","volumes":["example-pg-prisma-pg-flyway-postgre-sql-volume:/bitnami/postgresql"],"ports":["5432:5432"],"networks":["example-pg-prisma-pg-flyway-network"],"healthcheck":{"test":["CMD-SHELL","pg_isready -U postgres"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-pg-prisma-pg-flyway-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-pg-prisma-pg-flyway-postgre-sql-volume":{"name":"example-pg-prisma-pg-flyway-postgre-sql-volume"}}```|

### PgFlyway
PgFlyway - utility for working with database migrations (site: https://www.npmjs.com/package/pg-flyway, preview version only for Postgres)

#### Environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://feat_pg_flyway:feat_pg_flyway_password@localhost:5432/feat_pg_flyway?schema=public```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```pg-flyway-pg-prisma```|
|`migrationsFolder`|**isNotEmpty** (migrationsFolder should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pg-prisma-pg-flyway/src/migrations```|

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Generator ecosystem.config.json for https://www.npmjs.com/package/pm2)

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`ecosystemConfigFile`|**isNotEmpty** (ecosystemConfigFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/ecosystem.config.json```|
|`applicationScriptFile`|**isNotEmpty** (applicationScriptFile should not be empty)|```dist/apps/example-pg-prisma-pg-flyway/main.js```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pg-prisma-pg-flyway/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposePostgreSQL
PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`rootDatabaseUrl`|`obj['rootDatabaseUrl']`, `process.env['EXAMPLE_PG_PRISMA_PG_FLYWAY_ROOT_DATABASE_URL']`|**isNotEmpty** (rootDatabaseUrl should not be empty)|-|

#### Feature environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_PG_PRISMA_PG_FLYWAY_FEATURE_MODULE_NAME_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|

#### Modules that use feature environments
##### Feature module name: pg-flyway-pg-prisma

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://feat_pg_flyway:feat_pg_flyway_password@localhost:5432/feat_pg_flyway?schema=public```|
