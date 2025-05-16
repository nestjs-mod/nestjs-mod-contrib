# example-supabase
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

npm run docker-compose:start:example-supabase

npm run serve:dev:example-supabase
```
## Running the app in production mode
```bash
# preparing code, building code, creating infrastructure documentation and all the files necessary to raise the infrastructure and running tests (generate, build, docs:infrastructure, test)
npm run manual:prepare

npm run docs:infrastructure:example-supabase

npm run start:prod:example-supabase
```
## Test
```bash
npm run test:example-supabase
```
## System modules

### ProjectUtils
Utilities for setting global application parameters, such as project name, description, and settings validation parameters.

#### Shared providers
`WrapApplicationOptionsService`, `DotEnvService`, `PackageJsonService`, `ApplicationPackageJsonService`, `GitignoreService`, `NxProjectJsonService`, `ProjectUtilsPatcherService`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`applicationPackageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-supabase/package.json```|
|`packageJsonFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/package.json```|
|`envFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-supabase/.env```|

### DefaultNestApplicationInitializer
Default NestJS application initializer.

## Feature modules

### SupabaseModule
NestJS JavaScript Client for Supabase (Wrapper for https://www.npmjs.com/package/@supabase/supabase-js)

#### Shared providers
`SupabaseService`

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`url`|`obj['url']`, `process.env['EXAMPLE_SUPABASE_SUPABASE_URL']`|**isNotEmpty** (url should not be empty)|```https://asuvykozhdurwmnfdhwj.supabase.co```|
|`key`|`obj['key']`, `process.env['EXAMPLE_SUPABASE_SUPABASE_KEY']`|**isNotEmpty** (key should not be empty)|```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdXZ5a296aGR1cndtbmZkaHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjQ1MTksImV4cCI6MjA2MjkwMDUxOX0.Xe0eHD_cNhiMGaKfwP53-_0XhZ09oaC5OKQ4gsPbwV0```|
|`allowedExternalAppIds`|`obj['allowedExternalAppIds']`, `process.env['EXAMPLE_SUPABASE_SUPABASE_ALLOWED_EXTERNAL_APP_IDS']`|**optional**|-|
|`useGuards`|`obj['useGuards']`, `process.env['EXAMPLE_SUPABASE_SUPABASE_USE_GUARDS']`|**optional**|```true```|
|`useFilters`|`obj['useFilters']`, `process.env['EXAMPLE_SUPABASE_SUPABASE_USE_FILTERS']`|**optional**|```true```|

### AppModule
## Integration modules

### DefaultNestApplicationListener
Default NestJS application listener.

#### Static environments

| Key    | Sources | Constraints | Value |
| ------ | ------- | ----------- | ----- |
|`port`|`obj['port']`, `process.env['EXAMPLE_SUPABASE_PORT']`|**optional**|```3000```|
|`hostname`|`obj['hostname']`, `process.env['EXAMPLE_SUPABASE_HOSTNAME']`|**optional**|-|

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`mode`|**optional**|```silent```|

## Infrastructure modules

### InfrastructureMarkdownReportGenerator
Infrastructure markdown report generator.

#### Shared providers
`DynamicNestModuleMetadataMarkdownReportGenerator`

#### Static configuration

| Key    | Constraints | Value |
| ------ | ----------- | ----- |
|`markdownFile`|**optional**|```/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-supabase/INFRASTRUCTURE.MD```|
|`skipEmptySettings`|**optional**|```true```|
|`style`|**optional**|```pretty```|
