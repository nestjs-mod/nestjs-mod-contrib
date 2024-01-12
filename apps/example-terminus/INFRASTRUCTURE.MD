# Example

Example
## System modules
System modules necessary for the operation of the entire application (examples: launching a NestJS application, launching microservices, etc.).

### DefaultNestApplicationInitializer
Default NestJS application initializer, no third party utilities required.

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`cors`|CORS options from [CORS package](https://github.com/expressjs/cors#configuration-options)|**optional**|-|-|
|`bodyParser`|Whether to use underlying platform body parser.|**optional**|-|-|
|`httpsOptions`|Set of configurable HTTPS options|**optional**|-|-|
|`rawBody`|Whether to register the raw request body on the request. Use `req.rawBody`.|**optional**|-|-|

### NestjsPinoLogger
Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino)

#### Configuration
Variables of primitive and complex types that are used in the module; values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`requestIdHeaderName`|Header name for search requestId|**optional**|```request-id```|-|
|`exclude`|Optional parameter for routing. It should implement interface of parameters of NestJS built-in `MiddlewareConfigProxy['forRoutes']`. @see https://docs.nestjs.com/middleware#applying-middleware It can be used for both disabling automatic req/res logs and removing request context from following logs. It works for all requests by default. If you only need to turn off the automatic request/response logging for some specific (or all) routes but keep request context for app logs use `pinoHttp.autoLogging` field.|**optional**|-|-|
|`forRoutes`|Optional parameter for routing. It should implement interface of parameters of NestJS built-in `MiddlewareConfigProxy['forRoutes']`. @see https://docs.nestjs.com/middleware#applying-middleware It can be used for both disabling automatic req/res logs and removing request context from following logs. It works for all requests by default. If you only need to turn off the automatic request/response logging for some specific (or all) routes but keep request context for app logs use `pinoHttp.autoLogging` field.|**optional**|-|-|
|`pinoHttp`|Optional parameters for `pino-http` module @see https://github.com/pinojs/pino-http#pinohttpopts-stream|**optional**|-|-|
|`renameContext`|Optional parameter to change property name `context` in resulted logs, so logs will be like: {"level":30, ... "RENAME_CONTEXT_VALUE_HERE":"AppController" }|**optional**|-|-|
|`useExisting`|Optional parameter to skip pino configuration in case you are using FastifyAdapter, and already configure logger in adapter's config. The Pros and cons of this approach are described in the FAQ section of the documentation: @see https://github.com/iamolegga/nestjs-pino#faq.|**optional**|-|-|

### TerminusHealthCheck
Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)

#### Shared providers
`TerminusHealthCheckService`

#### Shared imports
`TerminusModule`

#### Configuration
Variables of primitive and complex types that are used in the module; values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`standardHealthIndicator`|Standard health indicators @see https://docs.nestjs.com/recipes/terminus#setting-up-a-healthcheck|**optional**|-|[ {"name":"memory_heap"} ]|

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`endpoint`|Rest endpoint for health check|**optional**|```health```|```health```|
|`errorLogStyle`|The style of the error logger @default 'json'|**optional**|-|-|
|`logger`|The logger to use. Either default logger or your own.|**optional**|-|-|
|`gracefulShutdownTimeoutMs`|The timeout to wait in ms before the application shuts down @default 0|**optional**|-|-|

#### Feature configuration
Feature variables of primitive and complex types that can be added to the current module from other modules (example: a transport for sending a message can be defined as a generalized interface, but the implementation itself will be added from a module for working with a specific transport or from an integration module).

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`name`|Name of health check|**isNotEmpty** (name should not be empty)|-|-|
|`isHealthy`|Logic for health check|**isNotEmpty** (isHealthy should not be empty)|-|-|


### DefaultNestApplicationListener
Default NestJS application listener, no third party utilities required.

#### Static environments
Static variables with primitive types used in the module and can be used at the time of generating module metadata (import, controllers), the values of which can be obtained from various sources, such as: process.env or consul key value.

| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`port`|The port on which to run the server.|`obj['port']`, `process.env['PORT']`|**isNotEmpty** (port should not be empty)|-|```3000```|
|`hostname`|Hostname on which to listen for incoming packets.|`obj['hostname']`, `process.env['HOSTNAME']`|**optional**|-|-|

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`mode`|Mode of start application: init - for run NestJS life cycle, listen -  for full start NestJS application|**optional**|```listen```|```listen```|
|`preListen`|Method for additional actions before listening|**optional**|-|Function|
|`postListen`|Method for additional actions after listening|**optional**|-|Function|

## Feature modules
Feature modules with business logic of the application.

### AppModule
Main app module

## Infrastructure modules
Infrastructure modules are needed to create configurations that launch various external services (examples: docker-compose file for raising a database, gitlab configuration for deploying an application).


### RestInfrastructureHtmlReport
Rest infrastructure HTML-report

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`markdownFile`|Name of the markdown-file in which to save the infrastructure report|**optional**|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-terminus/INFRASTRUCTURE.MD```|
