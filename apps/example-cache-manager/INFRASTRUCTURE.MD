# example-cache-manager
> Version: 0.0.0

Example application with cache-manager and redis
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

# running the docker-compose infrastructure for example-cache-manager
npm run docker-compose:start:example-cache-manager

# running example-cache-manager source code in watch mode
npm run serve:dev:example-cache-manager
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# running the docker-compose infrastructure for example-cache-manager
npm run docker-compose:start:example-cache-manager

# launching a built example-cache-manager (you must first build it using the build command)
npm run start:prod:example-cache-manager
```
## Test
```bash
# running tests for example-cache-manager
npm run test:example-cache-manager
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-cache-manager/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

## Core modules

### CacheManagerModule
A cache module for nodejs that allows easy wrapping of functions in cache, tiered caches, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/cache-manager)

#### Shared providers
`CacheManagerService`

#### Environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`redisUrl`|`obj['redisUrl']`, `process.env['EXAMPLE_CACHE_MANAGER_CACHE_MANAGER_USER_REDIS_URL']`|**optional**|```redis://:redis_password@localhost:6379```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```cache-manager-user```|

## Feature modules

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_CACHE_MANAGER_PORT']`|**optional**|```3004```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_CACHE_MANAGER_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-cache-manager/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_CACHE_MANAGER_REDIS

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-cache-manager-redis":{"image":"bitnami/redis:7.2","container_name":"example-cache-manager-redis","volumes":["example-cache-manager-redis-volume:/bitnami/redis/data"],"ports":["6379:6379"],"networks":["example-cache-manager-network"],"environment":{"REDIS_DATABASE":"0","REDIS_PASSWORD":"redis_password","REDIS_DISABLE_COMMANDS":"FLUSHDB,FLUSHALL","REDIS_IO_THREADS":2,"REDIS_IO_THREADS_DO_READS":"yes"},"keysOfEnvironmentsWithStaticValue":["disableCommands","featureName","image","ioThreads","ioThreadsDoReads","networks"],"healthcheck":{"test":["CMD-SHELL","redis-cli --no-auth-warning -a $$REDIS_PASSWORD ping | grep PONG"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-cache-manager-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-cache-manager-redis-volume":{"name":"example-cache-manager-redis-volume"}}```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-cache-manager/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposeRedis
The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`redisUrl`|`obj['redisUrl']`, `process.env['EXAMPLE_CACHE_MANAGER_CACHE_MANAGER_USER_REDIS_URL']`|**isNotEmpty** (redisUrl should not be empty)|```redis://:redis_password@localhost:6379```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```cache-manager-user```|
