# example-minio
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

# running the docker-compose infrastructure for example-minio
npm run docker-compose:start:example-minio

# running example-minio source code in watch mode
npm run serve:dev:example-minio
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# running the docker-compose infrastructure for example-minio
npm run docker-compose:start:example-minio

# launching a built example-minio (you must first build it using the build command)
npm run start:prod:example-minio
```
## Test
```bash
# running tests for example-minio
npm run test:example-minio
```
## Running the frontend app in watch mode
```bash
# running frontend application for example-minio in watch mode
npm run serve:dev:example-minio-angular
```
## All scripts
|Script|Description|
|---|---|
|**dev infra**|
|`npm run serve:dev:cli`|Running cli application source code in watch mode|
|`npm run serve:dev:example-pino-logger`|Running example-pino-logger application source code in watch mode|
|`npm run serve:dev:example-terminus`|Running example-terminus application source code in watch mode|
|`npm run serve:dev:example-prisma`|Running example-prisma application source code in watch mode|
|`npm run serve:dev`|Running NestJS application source code in watch mode|
|`npm run serve:dev:example-prisma-flyway`|Running example-prisma-flyway source code in watch mode|
|`npm run serve:dev:example-cache-manager`|Running example-cache-manager source code in watch mode|
|`npm run serve:dev:example-graphql`|Running example-graphql source code in watch mode|
|`npm run serve:dev:example-graphql:fastify`||
|`npm run serve:dev:example-minio`|Running example-minio source code in watch mode|
|**angular dev infra**|
|`npm run serve:dev:example-minio-angular`|Running frontend application for example-minio in watch mode|
|`npm run serve:dev:example-minio-angular-ssr`|Running frontend application in SSR mode for example-minio in watch mode|
|**pm2 prod infra**|
|`npm run pm2:start`|Launch all applications in PM2 mode|
|`npm run pm2:stop`|Stop all applications in PM2 mode|
|**prod infra**|
|`npm run start`|Launching a built NestJS application (you must first build it using the build command)|
|`npm run build`|Building a NestJS application|
|`npm run start:prod:cli`|Launching cli application (you must first build it using the build command)|
|`npm run start:prod:example-pino-logger`|Launching a built example-pino-logger (you must first build it using the build command)|
|`npm run start:prod:example-terminus`|Launching a built example-terminus (you must first build it using the build command)|
|`npm run start:prod:example-prisma`|Launching example-prisma application (you must first build it using the build command)|
|`npm run build:prod:example-prisma`|Building example-prisma application|
|`npm run start:prod:example-prisma-flyway`|Launching a built example-prisma-flyway (you must first build it using the build command)|
|`npm run start:prod:example-cache-manager`|Launching a built example-cache-manager (you must first build it using the build command)|
|`npm run start:prod:example-graphql`|Launching a built example-graphql (you must first build it using the build command)|
|`npm run start:prod:example-minio`|Launching a built example-minio (you must first build it using the build command)|
|`npm run build:prod:example-minio`||
|**docs**|
|`npm run docs:infrastructure`|Creation of documentation for the entire infrastructure and creation of files necessary to launch the infrastructure|
|`npm run docs:infrastructure:example-minio`||
|`npm run docs:infrastructure:example-prisma`|Creation of documentation for the entire infrastructure and creation of files necessary to launch the infrastructure for example-prisma|
|`npm run docs:infrastructure:example-terminus`|Creation of documentation for the entire infrastructure and creation of files necessary to launch the infrastructure for example-terminus|
|**docker-compose infra**|
|`npm run docker-compose:start:prisma`|Running the docker-compose infrastructure for prisma|
|`npm run docker-compose:stop:prisma`|Stopping the docker-compose infrastructure for prisma|
|`npm run docker-compose:start`|Running the main docker-compose infrastructure|
|`npm run docker-compose:stop`|Stopping the main docker-compose infrastructure|
|`npm run docker-compose:start:example-prisma-flyway`|Running the docker-compose infrastructure for example-prisma-flyway|
|`npm run docker-compose:stop:example-prisma-flyway`|Stopping the docker-compose infrastructure for example-prisma-flyway|
|`npm run docker-compose:start:example-cache-manager`|Running the docker-compose infrastructure for example-cache-manager|
|`npm run docker-compose:stop:example-cache-manager`|Stopping the docker-compose infrastructure for example-cache-manager|
|`npm run docker-compose:start:example-minio`|Running the docker-compose infrastructure for example-minio|
|`npm run docker-compose:stop:example-minio`|Stopping the docker-compose infrastructure for example-minio|
|**tests**|
|`npm run test`|Running tests across the entire project|
|`npm run test:example-pino-logger`|Running tests for example-pino-logger|
|`npm run test:example-terminus`|Running tests for example-terminus|
|`npm run test:example-prisma`|Running tests for example-prisma|
|`npm run test:example-prisma-flyway`|Running tests for example-prisma-flyway|
|`npm run test:example-cache-manager`|Running tests for example-cache-manager|
|`npm run test:example-graphql`|Running tests for example-graphql|
|`npm run test:example-minio`|Running tests for example-minio|
|**lint**|
|`npm run lint`|Checking the typescript code for the entire project|
|`npm run lint:fix`|Checking the typescript code throughout the project and trying to fix everything possible|
|`npm run tsc:lint`|Checking typescript code in libraries|
|**db**|
|`npm run db:create`|Creation all databases of applications and modules|
|**prisma**|
|`npm run prisma:migrate-dev-new:example-prisma`|Command to create new empty migration for example-prisma|
|`npm run prisma:migrate-dev:example-prisma`|Alias for create new migration for example-prisma (example: `npm run prisma:migrate-dev:example-prisma --name=new)`|
|`npm run prisma:migrate-deploy:example-prisma`|Applying migrations for example-prisma|
|`npm run prisma:migrate-deploy`|Applying migrations of all applications and modules|
|`npm run prisma:pull`|Generating a prisma schema based on a database|
|`npm run prisma:generate`|Generation of client prisma schema of all applications and modules|
|`npm run prisma:pull:example-prisma`|Generating a prisma schema based on a database for example-prisma|
|`npm run prisma:pull:example-prisma-flyway`|Generating a prisma schema based on a database for example-prisma-flyway|
|`npm run prisma:migrate-dev-new:example-prisma-flyway`|Command to create new empty migration for example-prisma-flyway|
|`npm run prisma:migrate-dev:example-prisma-flyway`|Alias for create new migration for example-prisma-flyway (example: `npm run prisma:migrate-dev:example-prisma-flyway --name=new)`|
|`npm run prisma:migrate-deploy:example-prisma-flyway`|Applying migrations for example-prisma-flyway|
|**flyway**|
|`npm run flyway:create:example-prisma-flyway`|Command to create new empty migration for example-prisma-flyway|
|`npm run flyway:migrate:example-prisma-flyway`|Applying migrations for example-prisma-flyway|
|`npm run flyway:migrate`|Applying migrations of all applications and modules|
|**utils**|
|`npm run generate`|Running the "generate" nx command in applications and libraries which can be customized at your discretion automatically generating an index.ts file for each library checking the code and trying to fix it|
|`npm run nx`|Alias for running the nx version locally, which is in the project (example: `npm run nx -- dep-graph`), in order not to install nx globally in the operating system|
|`npm run rucken`|Alias for console tools and scripts for nx and not only use to automate the workflow and speed up the development process (example: `npm run rucken -- make-ts-list`, site: https://www.npmjs.com/package/rucken)|
|`npm run dep-graph`|Generating dependency diagrams for nx applications and libraries|
|`npm run nx:many`|Alias for running many nx commands (example: `npm run nx:many -- -t=lint`), an exception has been added for the root project, since sometimes an attempt to run an nx command on it can lead to the command freezing|
|`npm run make-ts-list`|Automatically generating an index.ts file for each library, works only for nx applications created using the `--projectNameAndRootFormat=as-provided` flag|
|`npm run manual:prepare`|Preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)|
|`npm run update:nestjs-mod-versions`|Updating NestJS-mod libraries|
|`npm run tsc`|Alias for running the tsc version locally, which is in the project (example: `npm run tsc -- --noEmit -p tsconfig.base.json`), in order not to install tsc globally in the operating system|
## System modules
System modules necessary for the operation of the entire application (examples: launching a NestJS application, launching microservices, etc.). Only NestJS-mod compatible modules.

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`applicationPackageJsonFile`|Application package.json-file|**optional**|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/package.json```|
|`packageJsonFile`|Root package.json-file|**optional**|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|Dot-env file with environment variables|**optional**|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer, no third party utilities required.

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`bufferLogs`|If enabled, logs will be buffered until the "Logger#flush" method is called. @default false|**optional**|-|```true```|

### NestjsPinoLoggerModule
Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino)

### TerminusHealthCheckModule
Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)

#### Shared providers
`TerminusHealthCheckService`

#### Shared imports
`TerminusModule`

#### Configuration
Variables of primitive and complex types that are used in the module; values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`standardHealthIndicators`|Standard health indicators @see https://docs.nestjs.com/recipes/terminus#setting-up-a-healthcheck|**optional**|-|[ ```{"name":"memory_heap"}``` ]|

## Core modules
Core modules necessary for the operation of feature and integration modules (examples: main module with connection to the database, main module for connecting to aws, etc.). NestJS and NestJS-mod compatible modules.

### MinioModule
Minio client for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-minio)

#### Shared providers
`MinioService`, `MinioFilesService`

#### Static environments
Static variables with primitive types used in the module and can be used at the time of generating module metadata (import, controllers), the values of which can be obtained from various sources, such as: process.env or consul key value.

| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`minioServerHost`|Server host|`obj['minioServerHost']`, `process.env['EXAMPLE_MINIO_MINIO_SERVER_HOST']`|**isNotEmpty** (minioServerHost should not be empty)|-|```localhost```|
|`minioServerPort`|Server port|`obj['minioServerPort']`, `process.env['EXAMPLE_MINIO_MINIO_SERVER_PORT']`|**optional**|-|```9000```|
|`minioAccessKey`|Access key|`obj['minioAccessKey']`, `process.env['EXAMPLE_MINIO_MINIO_ACCESS_KEY']`|**isNotEmpty** (minioAccessKey should not be empty)|-|```minioadmin```|
|`minioSecretKey`|Secret key|`obj['minioSecretKey']`, `process.env['EXAMPLE_MINIO_MINIO_SECRET_KEY']`|**isNotEmpty** (minioSecretKey should not be empty)|-|```6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq```|

## Feature modules
Feature modules with business logic of the application. NestJS and NestJS-mod compatible modules.

### AppModule
## Integration modules
Integration modules are necessary to organize communication between feature or core modules (example: after creating a user in the UsersModule feature module, you need to send him a letter from the NotificationsModule core module). NestJS and NestJS-mod compatible modules.

### DefaultNestApplicationListener
Default NestJS application listener, no third party utilities required.

#### Static environments
Static variables with primitive types used in the module and can be used at the time of generating module metadata (import, controllers), the values of which can be obtained from various sources, such as: process.env or consul key value.

| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`port`|The port on which to run the server.|`obj['port']`, `process.env['EXAMPLE_MINIO_PORT']`|**isNotEmpty** (port should not be empty)|-|```3006```|

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`mode`|Mode of start application: init - for run NestJS life cycle, listen -  for full start NestJS application|**optional**|```listen```|```init```|

## Infrastructure modules
Infrastructure modules are needed to create configurations that launch various external services (examples: docker-compose file for raising a database, gitlab configuration for deploying an application). Only NestJS-mod compatible modules.

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Generator ecosystem.config.json for https://www.npmjs.com/package/pm2)

#### Configuration
Variables of primitive and complex types that are used in the module; values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`ecosystemConfigFile`|Configuration file for PM2|**isNotEmpty** (ecosystemConfigFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/ecosystem.config.json```|
|`applicationScriptFile`|Application script file name for run|**isNotEmpty** (applicationScriptFile should not be empty)|-|```dist/apps/example-minio/main.js```|

### DockerCompose
Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose)

#### Shared providers
`ManualDockerComposeFeatures`

#### Configuration
Variables of primitive and complex types that are used in the module; values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`dockerComposeFile`|Main file for docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications.|**isNotEmpty** (dockerComposeFile should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_MINIO_MINIO


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"example-minio-minio":{"image":"bitnami/minio:2024.2.9","container_name":"example-minio-minio","volumes":["example-minio-minio-volume:/bitnami/minio/data"],"ports":["9000:9000","9001:9001"],"networks":["example-minio-network"],"environment":{"MINIO_ROOT_USER":"minioadmin","MINIO_ROOT_PASSWORD":"6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq"},"healthcheck":{"test":["CMD-SHELL","mc","ready","local"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"example-minio-network":{"driver":"bridge"}}```|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|```{"example-minio-minio-volume":{"name":"example-minio-minio-volume"}}```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_MINIO_NGINX


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"example-minio-nginx":{"image":"nginx:alpine","container_name":"example-minio-nginx","volumes":["/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/config:/etc/nginx/conf.d","/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/logs:/var/log/nginx/"],"ports":["1111:1111"],"networks":["example-minio-network"],"tty":true,"restart":"always","depends_on":{"example-minio-minio":{"condition":"service_started"}}}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"example-minio-network":{"driver":"bridge"}}```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`markdownFile`|Name of the markdown-file in which to save the infrastructure report|**optional**|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|Skip empty values of env and config models|**optional**|-|```true```|

### DockerComposeMinio
MinIO is a high-performance, S3 compatible object storage. (Generator for minio in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments
Static variables with primitive types used in the module and can be used at the time of generating module metadata (import, controllers), the values of which can be obtained from various sources, such as: process.env or consul key value.

| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`minioRootUser`|Minio root user.|`obj['minioRootUser']`, `process.env['EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_USER']`|**isNotEmpty** (minioRootUser should not be empty)|-|```minioadmin```|
|`minioRootPassword`|Minio root password.|`obj['minioRootPassword']`, `process.env['EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_PASSWORD']`|**isNotEmpty** (minioRootPassword should not be empty)|-|```6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq```|

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|```minio-user```|
|`nginxPort`|External port for proxy access over nginx (infrastructure, need for disable CORS errors)|**optional**|-|```1111```|
|`nginxFilesFolder`|Folder for store nginx config and logs (infrastructure)|**optional**|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix```|

### DockerComposeNginx
Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. (Generator for nginx in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static configuration
Static variables of primitive and complex types that are used in the module and can be used at the time of generating module metadata (import, controllers); values for them must be passed when connecting the module to the application.

| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`configContent`|Config content|**isNotEmpty** (configContent should not be empty)|-|```      map $sent_http_content_type $expires {        "text/html" epoch;        "text/html; charset=utf-8" epoch;        default off;    }        map $http_upgrade $connection_upgrade {        default upgrade;        '' close;    }        server {        listen 1111;        server_name localhost;            gzip on;        gzip_proxied any;        gzip_types text/plain application/xml text/css application/javascript application/json;        gzip_min_length 1000;        gzip_vary on;        gzip_disable "MSIE [1-6]\.(?!.*SV1)";            client_max_body_size 50m;        proxy_connect_timeout 3600s;        proxy_read_timeout 3600s;        proxy_send_timeout 3600s;        send_timeout 3600s;            proxy_max_temp_file_size 0;            location /files {            proxy_set_header Host localhost:9000;            proxy_set_header Origin $http_origin;            proxy_set_header X-Real-IP $remote_addr;            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;            proxy_set_header X-Forwarded-Proto $scheme;            rewrite ^/files/(.*)$ /$1 break;            proxy_pass http://example-minio-minio:9000;            proxy_http_version 1.1;            proxy_set_header Accept-Language $http_accept_language;            proxy_set_header Upgrade $http_upgrade;            proxy_set_header Connection $connection_upgrade;        }        }      ```|
|`configFolder`|Config folder for map volume to /etc/nginx/conf.d|**isNotEmpty** (configFolder should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/config```|
|`logsFolder`|Logs folder for map volume to /var/log/nginx/|**isNotEmpty** (logsFolder should not be empty)|-|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/logs```|
|`serviceNames`|Depends on services|**optional**|-|```{"example-minio-minio":"service_started"}```|
|`ports`|Ports|**optional**|-|```{"1111":1111}```|


## Maintainers
- [EndyKaufman](admin@site15.ru)

## License
[MIT](LICENSE)