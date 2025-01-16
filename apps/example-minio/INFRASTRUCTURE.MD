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
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/package.json```|
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

### MinioModule
Minio client for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-minio)

#### Shared providers
`MinioService`, `MinioFilesService`

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`minioServerHost`|`obj['minioServerHost']`, `process.env['EXAMPLE_MINIO_MINIO_SERVER_HOST']`|**isNotEmpty** (minioServerHost should not be empty)|```localhost```|
|`minioServerPort`|`obj['minioServerPort']`, `process.env['EXAMPLE_MINIO_MINIO_SERVER_PORT']`|**optional**|```9000```|
|`minioAccessKey`|`obj['minioAccessKey']`, `process.env['EXAMPLE_MINIO_MINIO_ACCESS_KEY']`|**isNotEmpty** (minioAccessKey should not be empty)|```minioadmin```|
|`minioSecretKey`|`obj['minioSecretKey']`, `process.env['EXAMPLE_MINIO_MINIO_SECRET_KEY']`|**isNotEmpty** (minioSecretKey should not be empty)|```6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq```|
|`minioUseSSL`|`obj['minioUseSSL']`, `process.env['EXAMPLE_MINIO_MINIO_USE_SSL']`|**optional**|```false```|
|`minioDefaultUserId`|`obj['minioDefaultUserId']`, `process.env['EXAMPLE_MINIO_MINIO_DEFAULT_USER_ID']`|**optional**|```default```|

## Feature modules

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_MINIO_PORT']`|**optional**|```3006```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_MINIO_HOSTNAME']`|**optional**|-|

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
|`applicationScriptFile`|**isNotEmpty** (applicationScriptFile should not be empty)|```dist/apps/example-minio/main.js```|

### DockerCompose
Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose)

#### Shared providers
`ManualDockerComposeFeatures`

#### Configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_MINIO_MINIO

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-minio-minio":{"image":"bitnami/minio:2024.2.9","container_name":"example-minio-minio","volumes":["example-minio-minio-volume:/bitnami/minio/data"],"ports":["9000:9000","9001:9001"],"networks":["example-minio-network"],"environment":{"MINIO_ROOT_USER":"minioadmin","MINIO_ROOT_PASSWORD":"6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq"},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","nginxBucketsLocations","nginxConfigContent","nginxConfigFolder","nginxLogsFolder"],"healthcheck":{"test":["CMD-SHELL","mc","ready","local"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-minio-network":{"driver":"bridge"}}```|
|`volumes`|**optional**|```{"example-minio-minio-volume":{"name":"example-minio-minio-volume"}}```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_MINIO_NGINX

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-minio-nginx":{"image":"nginx:alpine","container_name":"example-minio-nginx","volumes":["/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/config:/etc/nginx/conf.d","/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/logs:/var/log/nginx/"],"ports":["1111:1111"],"networks":["example-minio-network"],"tty":true,"restart":"always","depends_on":{"example-minio-minio":{"condition":"service_started"}}}}```|
|`networks`|**optional**|```{"example-minio-network":{"driver":"bridge"}}```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposeMinio
MinIO is a high-performance, S3 compatible object storage. (Generator for minio in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`minioRootUser`|`obj['minioRootUser']`, `process.env['EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_USER']`|**isNotEmpty** (minioRootUser should not be empty)|```minioadmin```|
|`minioRootPassword`|`obj['minioRootPassword']`, `process.env['EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_PASSWORD']`|**isNotEmpty** (minioRootPassword should not be empty)|```6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq```|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`featureName`|**optional**|```minio-user```|
|`nginxPort`|**optional**|```1111```|
|`nginxConfigFolder`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/config```|
|`nginxLogsFolder`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/logs```|

### DockerComposeNginx
Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. (Generator for nginx in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`configContent`|**isNotEmpty** (configContent should not be empty)|```      map $sent_http_content_type $expires {        "text/html" epoch;        "text/html; charset=utf-8" epoch;        default off;    }        map $http_upgrade $connection_upgrade {        default upgrade;        '' close;    }        server {        listen 1111;        server_name localhost;            gzip on;        gzip_proxied any;        gzip_types text/plain application/xml text/css application/javascript application/json;        gzip_min_length 1000;        gzip_vary on;        gzip_disable "MSIE [1-6]\.(?!.*SV1)";            client_max_body_size 50m;        proxy_connect_timeout 3600s;        proxy_read_timeout 3600s;        proxy_send_timeout 3600s;        send_timeout 3600s;            proxy_max_temp_file_size 0;            location /files {            proxy_set_header Host localhost:9000;            proxy_set_header Origin $http_origin;            proxy_set_header X-Real-IP $remote_addr;            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;            proxy_set_header X-Forwarded-Proto $scheme;            rewrite ^/files/(.*)$ /$1 break;            proxy_pass http://%Minio%:9000;            proxy_http_version 1.1;            proxy_set_header Accept-Language $http_accept_language;            proxy_set_header Upgrade $http_upgrade;            proxy_set_header Connection $connection_upgrade;        }                }      ```|
|`configFolder`|**isNotEmpty** (configFolder should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/config```|
|`logsFolder`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-minio/ngnix/logs```|
|`dependsOnServiceNames`|**optional**|```{"Minio":"service_started"}```|
|`ports`|**optional**|```{"1111":1111}```|
