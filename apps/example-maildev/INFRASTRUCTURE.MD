# example-maildev
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

# running the docker-compose infrastructure for example-maildev
npm run docker-compose:start:example-maildev

npm run serve:dev:example-maildev
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

# running the docker-compose infrastructure for example-maildev
npm run docker-compose:start:example-maildev

npm run start:prod:example-maildev
```
## Test
```bash
npm run test:example-maildev
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-maildev/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

## Feature modules

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_MAILDEV_PORT']`|**optional**|```3007```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_MAILDEV_HOSTNAME']`|**optional**|-|

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
|`dockerComposeFile`|**isNotEmpty** (dockerComposeFile should not be empty)|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-maildev/docker-compose.yml```|

#### Modules that use feature configuration
##### Feature module name: EXAMPLE_MAILDEV_MAILDEV

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`services`|**optional**|```{"example-maildev-maildev":{"image":"maildev/maildev:2.2.1","container_name":"example-maildev-maildev","ports":["1025:1025","1080:1080"],"networks":["example-maildev-network"],"environment":{"MAILDEV_SMTP_PORT":1025,"MAILDEV_WEB_PORT":1080},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","smtpPort","webPort"],"healthcheck":{"test":"wget -O - http://localhost:${MAILDEV_WEB_PORT}${MAILDEV_BASE_PATHNAME}/healthz || exit 1","interval":"10s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|**optional**|```{"example-maildev-network":{"driver":"bridge"}}```|

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-maildev/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|

### DockerComposeMaildev
MailDev is a simple way to test your projects generated email during development, with an easy to use web interface that runs on your machine. (Generator for maildev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`maildevMailDirectory`|`obj['maildevMailDirectory']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_MAIL_DIRECTORY']`|**optional**|-|
|`maildevHttps`|`obj['maildevHttps']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_HTTPS']`|**optional**|-|
|`maildevHttpsKey`|`obj['maildevHttpsKey']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_HTTPS_KEY']`|**optional**|-|
|`maildevHttpsCert`|`obj['maildevHttpsCert']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_HTTPS_CERT']`|**optional**|-|
|`maildevIp`|`obj['maildevIp']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_IP']`|**optional**|-|
|`maildevOutgoingHost`|`obj['maildevOutgoingHost']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_OUTGOING_HOST']`|**optional**|-|
|`maildevOutgoingPort`|`obj['maildevOutgoingPort']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_OUTGOING_PORT']`|**optional**|-|
|`maildevOutgoingUser`|`obj['maildevOutgoingUser']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_OUTGOING_USER']`|**optional**|-|
|`maildevOutgoingPass`|`obj['maildevOutgoingPass']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_OUTGOING_PASS']`|**optional**|**hidden**|
|`maildevOutgoingSecure`|`obj['maildevOutgoingSecure']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_OUTGOING_SECURE']`|**optional**|-|
|`maildevAutoRelay`|`obj['maildevAutoRelay']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_AUTO_RELAY']`|**optional**|-|
|`maildevAutoRelayRules`|`obj['maildevAutoRelayRules']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_AUTO_RELAY_RULES']`|**optional**|-|
|`maildevIncomingUser`|`obj['maildevIncomingUser']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_INCOMING_USER']`|**optional**|-|
|`maildevIncomingPass`|`obj['maildevIncomingPass']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_INCOMING_PASS']`|**optional**|**hidden**|
|`maildevIncomingSecure`|`obj['maildevIncomingSecure']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_INCOMING_SECURE']`|**optional**|-|
|`maildevIncomingCert`|`obj['maildevIncomingCert']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_INCOMING_CERT']`|**optional**|-|
|`maildevIncomingKey`|`obj['maildevIncomingKey']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_INCOMING_KEY']`|**optional**|-|
|`maildevWebIp`|`obj['maildevWebIp']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_WEB_IP']`|**optional**|-|
|`maildevWebUser`|`obj['maildevWebUser']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_WEB_USER']`|**optional**|-|
|`maildevWebPass`|`obj['maildevWebPass']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_WEB_PASS']`|**optional**|**hidden**|
|`maildevBasePathname`|`obj['maildevBasePathname']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_BASE_PATHNAME']`|**optional**|-|
|`maildevDisableWeb`|`obj['maildevDisableWeb']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_DISABLE_WEB']`|**optional**|-|
|`maildevHideExtensions`|`obj['maildevHideExtensions']`, `process.env['EXAMPLE_MAILDEV_MAILDEV_HIDE_EXTENSIONS']`|**optional**|-|
