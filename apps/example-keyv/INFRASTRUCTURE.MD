# example-keyv
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

# running example-keyv source code in watch mode
npm run serve:dev:example-keyv
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# launching a built example-keyv (you must first build it using the build command)
npm run start:prod:example-keyv
```
## Test
```bash
# running tests for example-keyv
npm run test:example-keyv
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-keyv/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

## Core modules

### KeyvModule
Simple key-value storage with support for multiple backends, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/keyv)

#### Shared providers
`KeyvService`

#### Environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`url`|`obj['url']`, `process.env['EXAMPLE_KEYV_KEYV_KEYV_USER_URL']`|**optional**|```redis://:pass@localhost:6379```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```keyv-user```|
|`storeFactoryByEnvironmentUrl`|**optional**|```storeFactoryByEnvironmentUrl```|

## Feature modules

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_KEYV_PORT']`|**optional**|```40011```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_KEYV_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-keyv/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_KEYV_REDIS

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-keyv-redis":{"image":"bitnami/redis:7.2","container_name":"example-keyv-redis","volumes":["example-keyv-redis-volume:/bitnami/redis/data"],"ports":["6379:6379"],"networks":["example-keyv-network"],"environment":{"REDIS_DATABASE":"0","REDIS_PASSWORD":"pass","REDIS_DISABLE_COMMANDS":"FLUSHDB,FLUSHALL","REDIS_IO_THREADS":2,"REDIS_IO_THREADS_DO_READS":"yes"},"keysOfEnvironmentsWithStaticValue":["disableCommands","featureName","image","ioThreads","ioThreadsDoReads","networks"],"healthcheck":{"test":["CMD-SHELL","redis-cli --no-auth-warning -a $$REDIS_PASSWORD ping | grep PONG"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-keyv-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-keyv-redis-volume":{"name":"example-keyv-redis-volume"}}```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-keyv/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposeRedis
The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`redisUrl`|`obj['redisUrl']`, `process.env['EXAMPLE_KEYV_KEYV_USER_REDIS_URL']`|**isNotEmpty** (redisUrl should not be empty)|```redis://:pass@localhost:6379```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```keyv-user```|
