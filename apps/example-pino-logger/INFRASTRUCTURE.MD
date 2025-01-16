# pino-logger
> Version: 0.0.0

Example application with PM2 and Pino-logger
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

# running example-pino-logger application source code in watch mode
npm run serve:dev:example-pino-logger
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# launching a built example-pino-logger (you must first build it using the build command)
npm run start:prod:example-pino-logger
```
## Test
```bash
# running tests for example-pino-logger
npm run test:example-pino-logger
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pino-logger/package.json```|
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

## Feature modules

### AppModule
Main app module

## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['PINO_LOGGER_PORT']`|**optional**|```3001```|
|`hostname`|`obj['hostname']`, `process.env['PINO_LOGGER_HOSTNAME']`|**optional**|-|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`mode`|**optional**|```silent```|

## Infrastructure modules

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Generator ecosystem.config.json for https://www.npmjs.com/package/pm2)

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`ecosystemConfigFile`|**isNotEmpty** (ecosystemConfigFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/ecosystem.config.json```|
|`applicationScriptFile`|**isNotEmpty** (applicationScriptFile should not be empty)|```dist/apps/example-pino-logger/main.js```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pino-logger/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|
