# nestjs-mod

A command line interface (CLI) for create and manipulation with NestJS-mod application
## System modules
System modules necessary for the operation of the entire application (examples: launching a NestJS application, launching microservices, etc.).

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`applicationPackageJsonFile`|Application package.json-file|**isNotEmpty** (applicationPackageJsonFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/cli/package.json```|
|`packageJsonFile`|Root package.json-file.|**optional**|-|-|
|`envFile`|Dot-env file with environment variables.|**optional**|-|-|
|`patchProject`|Patch project properties|**optional**|```true```|```false```|
|`patchGlobalConfigurationAndEnvironmentsOptions`|Patch configuration and environments options|**optional**|```true```|```false```|

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

### DefaultNestApplicationListener
Default NestJS application listener, no third party utilities required.

#### Static environments
Static variables with primitive types used in the module and can be used at the time of generating module metadata (import, controllers), the values of which can be obtained from various sources, such as: process.env or consul key value.

| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`port`|The port on which to run the server.|`obj['port']`, `process.env['PORT']`|**isNotEmpty** (port should not be empty)|-|-|
|`hostname`|Hostname on which to listen for incoming packets.|`obj['hostname']`, `process.env['HOSTNAME']`|**optional**|-|-|

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`mode`|Mode of start application: init - for run NestJS life cycle, listen -  for full start NestJS application|**optional**|```listen```|```init```|
|`preListen`|Method for additional actions before listening|**optional**|-|-|
|`postListen`|Method for additional actions after listening|**optional**|-|-|

## Infrastructure modules
Infrastructure modules are needed to create configurations that launch various external services (examples: docker-compose file for raising a database, gitlab configuration for deploying an application).

### NestjsModAllReadmeGenerator
Readme generator for nestjs-mod project.

#### Static configuration(nestjs-pino)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

#### Static configuration(terminus)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

#### Static configuration(pm2)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

### NestjsModAllReadmeGenerator
Readme generator for nestjs-mod project.

#### Static configuration(nestjs-pino)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

#### Static configuration(terminus)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

#### Static configuration(pm2)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

### NestjsModAllReadmeGenerator
Readme generator for nestjs-mod project.

#### Static configuration(nestjs-pino)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/nestjs-pino/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

#### Static configuration(terminus)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/system/terminus/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

#### Static configuration(pm2)
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`utilsFolders`|Folders with utilities|**isNotEmpty** (utilsFolders should not be empty)|-|[ ```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/src/lib``` ]|
|`modules`|Folders with modules|**isNotEmpty** (modules should not be empty)|-|-|
|`packageFile`|Name of the package.json file with information|**isNotEmpty** (packageFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/package.json```|
|`markdownFile`|Name of the markdown file in which to save|**isNotEmpty** (markdownFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/libs/infrastructure/pm2/README.md```|
|`telegramGroup`|Telegram group|**optional**|-|```https://t.me/nestjs_mod```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`markdownFile`|Name of the markdown-file in which to save the infrastructure report|**optional**|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/cli/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|Skip empty values of env and config models|**optional**|-|```false```|
