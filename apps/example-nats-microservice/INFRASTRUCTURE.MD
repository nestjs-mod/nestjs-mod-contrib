# example-nats-microservice
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

# running the docker-compose infrastructure for example-nats-microservice
npm run docker-compose:start:example-nats-microservice

# running example-nats-microservice source code in watch mode
npm run serve:dev:example-nats-microservice
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# running the docker-compose infrastructure for example-nats-microservice
npm run docker-compose:start:example-nats-microservice

# launching a built example-nats-microservice (you must first build it using the build command)
npm run start:prod:example-nats-microservice
```
## Test
```bash
# running tests for example-nats-microservice
npm run test:example-nats-microservice
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-nats-microservice/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`bufferLogs`|**optional**|```true```|

### NatsNestMicroservice
Nats NestJS-mod microservice initializer @see https://docs.nestjs.com/microservices/nats

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`name`|`obj['name']`, `process.env['EXAMPLE_NATS_MICROSERVICE_NATS_NAME']`|**optional**|-|
|`user`|`obj['user']`, `process.env['EXAMPLE_NATS_MICROSERVICE_NATS_USER']`|**optional**|```natsadmin```|
|`pass`|`obj['pass']`, `process.env['EXAMPLE_NATS_MICROSERVICE_NATS_PASS']`|**optional**|```6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgpp1```|
|`servers`|`obj['servers']`, `process.env['EXAMPLE_NATS_MICROSERVICE_NATS_SERVERS']`|**optional**|[ ```nats://localhost:4222``` ]|

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
|`port`|`obj['port']`, `process.env['EXAMPLE_NATS_MICROSERVICE_PORT']`|**optional**|```5002```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_NATS_MICROSERVICE_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-nats-microservice/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_NATS_MICROSERVICE_NATS

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-nats-microservice-nats":{"image":"bitnami/nats:2.10.5","container_name":"example-nats-microservice-nats","volumes":["example-nats-microservice-nats-volume:/bitnami/nats/data"],"ports":["8222:8222","4222:4222"],"networks":["example-nats-microservice-network"],"environment":{"NATS_ENABLE_AUTH":"yes","NATS_USERNAME":"natsadmin","NATS_PASSWORD":"6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgpp1","NATS_EXTRA_ARGS":"-js"},"keysOfEnvironmentsWithStaticValue":["featureName","image","extraArgs","networks"],"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-nats-microservice-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-nats-microservice-nats-volume":{"name":"example-nats-microservice-nats-volume"}}```|

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Generator ecosystem.config.json for https://www.npmjs.com/package/pm2)

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`ecosystemConfigFile`|**isNotEmpty** (ecosystemConfigFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/ecosystem.config.json```|
|`applicationScriptFile`|**isNotEmpty** (applicationScriptFile should not be empty)|```dist/apps/example-nats-microservice/main.js```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-nats-microservice/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposeNats
NATS is an open source, lightweight and high-performance messaging system. It is ideal for distributed systems and supports modern cloud architectures and pub-sub, request-reply and queuing models. (Generator for nats in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`natsEnableAuth`|`obj['natsEnableAuth']`, `process.env['EXAMPLE_NATS_MICROSERVICE_NATS_MICROSERVICE_USER_NATS_ENABLE_AUTH']`|**optional**|```yes```|
|`natsUsername`|`obj['natsUsername']`, `process.env['EXAMPLE_NATS_MICROSERVICE_NATS_MICROSERVICE_USER_NATS_USERNAME']`|**optional**|```natsadmin```|
|`natsPassword`|`obj['natsPassword']`, `process.env['EXAMPLE_NATS_MICROSERVICE_NATS_MICROSERVICE_USER_NATS_PASSWORD']`|**optional**|```6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgpp1```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```nats-microservice-user```|
