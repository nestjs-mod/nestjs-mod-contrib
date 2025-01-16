# example-redis-microservice
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

# running the docker-compose infrastructure for example-redis-microservice
npm run docker-compose:start:example-redis-microservice

# running example-redis-microservice source code in watch mode
npm run serve:dev:example-redis-microservice
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# running the docker-compose infrastructure for example-redis-microservice
npm run docker-compose:start:example-redis-microservice

# launching a built example-redis-microservice (you must first build it using the build command)
npm run start:prod:example-redis-microservice
```
## Test
```bash
# running tests for example-redis-microservice
npm run test:example-redis-microservice
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-redis-microservice/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`bufferLogs`|**optional**|```true```|

### RedisNestMicroservice
Redis NestJS-mod microservice initializer @see https://docs.nestjs.com/microservices/redis

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`host`|`obj['host']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_REDIS_HOST']`|**optional**|-|
|`port`|`obj['port']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_REDIS_PORT']`|**optional**|```6379```|
|`username`|`obj['username']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_REDIS_USERNAME']`|**optional**|-|
|`password`|`obj['password']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_REDIS_PASSWORD']`|**optional**|```redis_password```|
|`db`|`obj['db']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_REDIS_DB']`|**optional**|```0```|

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

## Feature modules

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_PORT']`|**optional**|```5001```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-redis-microservice/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_REDIS_MICROSERVICE_REDIS

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-redis-microservice-redis":{"image":"bitnami/redis:7.2","container_name":"example-redis-microservice-redis","volumes":["example-redis-microservice-redis-volume:/bitnami/redis/data"],"ports":["6379:6379"],"networks":["example-redis-microservice-network"],"environment":{"REDIS_DATABASE":"0","REDIS_PASSWORD":"redis_password","REDIS_DISABLE_COMMANDS":"FLUSHDB,FLUSHALL","REDIS_IO_THREADS":2,"REDIS_IO_THREADS_DO_READS":"yes"},"keysOfEnvironmentsWithStaticValue":["disableCommands","featureName","image","ioThreads","ioThreadsDoReads","networks"],"healthcheck":{"test":["CMD-SHELL","redis-cli --no-auth-warning -a $$REDIS_PASSWORD ping | grep PONG"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-redis-microservice-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-redis-microservice-redis-volume":{"name":"example-redis-microservice-redis-volume"}}```|

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Generator ecosystem.config.json for https://www.npmjs.com/package/pm2)

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`ecosystemConfigFile`|**isNotEmpty** (ecosystemConfigFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/ecosystem.config.json```|
|`applicationScriptFile`|**isNotEmpty** (applicationScriptFile should not be empty)|```dist/apps/example-redis-microservice/main.js```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-redis-microservice/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposeRedis
The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`redisUrl`|`obj['redisUrl']`, `process.env['EXAMPLE_REDIS_MICROSERVICE_REDIS_MICROSERVICE_USER_REDIS_URL']`|**isNotEmpty** (redisUrl should not be empty)|```redis://:redis_password@localhost:6379```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```redis-microservice-user```|
