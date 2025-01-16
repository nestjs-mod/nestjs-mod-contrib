# terminus
> Version: 0.0.0

Example application with PM2, docker-compose, postgres and terminus
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

# running the main docker-compose infrastructure
npm run docker-compose:start

# creation all databases of applications and modules
npm run db:create

# applying migrations of all applications and modules
npm run prisma:migrate-deploy

# running example-terminus application source code in watch mode
npm run serve:dev:example-terminus
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# running the main docker-compose infrastructure
npm run docker-compose:start

# creation all databases of applications and modules
npm run db:create

# applying migrations of all applications and modules
npm run prisma:migrate-deploy

# launching a built example-terminus (you must first build it using the build command)
npm run start:prod:example-terminus
```
## Test
```bash
# running tests for example-terminus
npm run test:example-terminus
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-terminus/package.json```|
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

### CORE1
## Feature modules

### AppModule
Main app module

## Integration modules

### INTEGRATIONS1
### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['TERMINUS_PORT']`|**optional**|```3002```|
|`hostname`|`obj['hostname']`, `process.env['TERMINUS_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: TERMINUS_POSTGRE_SQL

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"terminus-postgre-sql":{"image":"bitnami/postgresql:15.5.0","container_name":"terminus-postgre-sql","volumes":["terminus-postgre-sql-volume:/bitnami/postgresql"],"ports":["5432:5432"],"networks":["terminus-network"],"healthcheck":{"test":["CMD-SHELL","pg_isready -U postgres"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"terminus-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"terminus-postgre-sql-volume":{"name":"terminus-postgre-sql-volume"}}```|

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Generator ecosystem.config.json for https://www.npmjs.com/package/pm2)

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`ecosystemConfigFile`|**isNotEmpty** (ecosystemConfigFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/ecosystem.config.json```|
|`applicationScriptFile`|**isNotEmpty** (applicationScriptFile should not be empty)|```dist/apps/example-terminus/main.js```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-terminus/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposePostgreSQL
PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`rootDatabaseUrl`|`obj['rootDatabaseUrl']`, `process.env['TERMINUS_ROOT_DATABASE_URL']`|**isNotEmpty** (rootDatabaseUrl should not be empty)|```postgres://postgres:postgres_password@localhost:5432/postgres?schema=public```|

#### Feature environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['TERMINUS_FEATURE_MODULE_NAME_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|

#### Modules that use feature environments
##### Feature module name: feat

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`databaseUrl`|`obj['databaseUrl']`, `process.env['TERMINUS_FEAT_DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|```postgres://feat:feat_password@localhost:5432/feat?schema=public```|
