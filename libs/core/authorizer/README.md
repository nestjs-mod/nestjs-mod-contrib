
# @nestjs-mod/authorizer

Universal javaScript SDK for Authorizer API (Wrapper for https://www.npmjs.com/package/@authorizerdev/authorizer-js)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @authorizerdev/authorizer-js@2.0.0 @nestjs-mod/authorizer
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [AuthorizerModule](#authorizermodule) | core | Universal javaScript SDK for Authorizer API |


## Modules descriptions

### AuthorizerModule
Universal javaScript SDK for Authorizer API

#### Use in NestJS-mod
An approximate description of how to connect, an extended description with an example application will be next time (todo: right now I have a lot of work and don’t have time to arrange everything properly 😉)

```typescript
@Controller()
export class AppController {
  constructor(private readonly authorizerService: AuthorizerService) {}

  @Get('get-authorizer-client-id')
  @AllowEmptyUser()
  getAuthorizerClientID(@CurrentAuthorizerUser() authorizerUser: AuthorizerUser) {
    console.log(authorizerUser);
    return this.authorizerService.config.clientID;
  }
}

const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [
    AuthorizerModule.forFeature({
      featureModuleName: 'AppModule',
    }),
  ],
  controllers: [AppController],
});

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot({
        staticConfiguration: {
          bufferLogs: true,
        },
      }),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
    core: [
      AuthorizerModule.forRoot({
        staticConfiguration: {
          checkAccessValidator: async (
            authorizerUser?: AuthorizerUser,
            options?: CheckAccessOptions,
            ctx?: ExecutionContext
          ) => {
            if (
              typeof ctx?.getClass === 'function' &&
              typeof ctx?.getHandler === 'function' &&
              ctx?.getClass().name === 'TerminusHealthCheckController' &&
              ctx?.getHandler().name === 'check'
            ) {
              return true;
            }

            return defaultAuthorizerCheckAccessValidator(authorizerUser, options);
          },
        },
      }),
    ],
    feature: [AppModule.forRoot()],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: authorizerFeatureName,
      }),
      DockerComposeRedis.forRoot(),
      DockerComposeAuthorizer.forRoot({
        staticEnvironments: {
          redisUrl: '%SERVER_AUTHORIZER_INTERNAL_REDIS_URL%',
          databaseUrl: '%SERVER_AUTHORIZER_INTERNAL_DATABASE_URL%',
        },
        staticConfiguration: {
          featureName: authorizerFeatureName,
          organizationName: 'OrganizationName',
          dependsOnServiceNames: {
            'postgre-sql-migrations': 'service_completed_successfully',
            redis: 'service_healthy',
          },
        },
      }),
    ],
  },
});
```

New environment variable

```bash
SERVER_AUTHORIZER_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer?schema=public
SERVER_AUTHORIZER_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
SERVER_AUTHORIZER_INTERNAL_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer
SERVER_AUTHORIZER_INTERNAL_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Shared providers
`AuthorizerService`

#### Environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`clientId`|Client ID|`obj['clientId']`, `process.env['AUTHORIZER_CLIENT_ID']`|**optional**|-|-|
|`authorizerURL`|Authorizer URL|`obj['authorizerURL']`, `process.env['AUTHORIZER_AUTHORIZER_URL']`|**isNotEmpty** (authorizerURL should not be empty)|-|-|
|`redirectURL`|Redirect URL|`obj['redirectURL']`, `process.env['AUTHORIZER_REDIRECT_URL']`|**isNotEmpty** (redirectURL should not be empty)|-|-|
|`adminSecret`|Admin secret|`obj['adminSecret']`, `process.env['AUTHORIZER_ADMIN_SECRET']`|**optional**|-|-|
|`allowedExternalAppIds`|Allowed identifiers of external applications, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing.|`obj['allowedExternalAppIds']`, `process.env['AUTHORIZER_ALLOWED_EXTERNAL_APP_IDS']`|**optional**|-|-|

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`extraHeaders`|Extra headers|**optional**|-|-|
|`getRequestFromContext`|Function for resolve request from execution context|**optional**|```getRequestFromExecutionContext```|-|
|`checkAccessValidator`|External function for validate permissions|**optional**|```defaultAuthorizerCheckAccessValidator```|-|
|`externalUserIdHeaderName`|A header for searching for an external user ID, if you have logged in previously and do not need to log in again in the authorization service, can be used during testing.|**optional**|```x-external-user-id```|-|
|`externalAppIdHeaderName`|Header for searching for external application identifiers, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing.|**optional**|```x-external-app-id```|-|
|`getAuthorizerUserFromExternalUserId`|Function for resolve authorizer user by externalUserId|**optional**|```defaultAuthorizerGetAuthorizerUserFromExternalUserId```|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|

[Back to Top](#modules)

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)
* https://github.com/nestjs-mod/nestjs-mod/blob/master/apps/example-basic/INFRASTRUCTURE.MD - A simple example of infrastructure documentation.
* https://github.com/nestjs-mod/nestjs-mod-contrib/blob/master/apps/example-prisma/INFRASTRUCTURE.MD - An extended example of infrastructure documentation with a docker-compose file and a data base.
* https://dev.to/endykaufman/collection-of-nestjs-mod-utilities-for-unifying-applications-and-modules-on-nestjs-5256 - Article about the project NestJS-mod
* https://habr.com/ru/articles/788916 - Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS


## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/authorizer
[npm-url]: https://npmjs.org/package/@nestjs-mod/authorizer
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/authorizer
[downloads-url]: https://npmjs.org/package/@nestjs-mod/authorizer
