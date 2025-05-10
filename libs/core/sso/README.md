
# @nestjs-mod/sso

Universal javaScript SDK for Sso API (Wrapper for https://www.npmjs.com/package/@ssodev/sso-js)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @ssodev/sso-js@2.0.0 @nestjs-mod/sso
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [SsoModule](#ssomodule) | core | Universal javaScript SDK for Sso API |


## Modules descriptions

### SsoModule
Universal javaScript SDK for Sso API

#### Use in NestJS-mod
An approximate description of how to connect, an extended description with an example application will be next time (todo: right now I have a lot of work and don’t have time to arrange everything properly 😉)

```typescript
@Controller()
export class AppController {
  constructor(private readonly ssoService: SsoService) {}

  @Get('get-sso-client-id')
  @AllowEmptyUser()
  getSsoClientID(@CurrentSsoUser() ssoUser: SsoUser) {
    console.log(ssoUser);
    return this.ssoService.config.clientID;
  }
}

const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [
    SsoModule.forFeature({
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
      SsoModule.forRoot({
        staticConfiguration: {
          checkAccessValidator: async (
            ssoUser?: SsoUser,
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

            return defaultSsoCheckAccessValidator(ssoUser, options);
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
        featureModuleName: ssoFeatureName,
      }),
      DockerComposeRedis.forRoot(),
      DockerComposeSso.forRoot({
        staticEnvironments: {
          redisUrl: '%SERVER_SSO_INTERNAL_REDIS_URL%',
          databaseUrl: '%SERVER_SSO_INTERNAL_DATABASE_URL%',
        },
        staticConfiguration: {
          featureName: ssoFeatureName,
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
SERVER_SSO_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/sso?schema=public
SERVER_SSO_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
SERVER_SSO_INTERNAL_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/sso
SERVER_SSO_INTERNAL_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Shared providers
`SsoService`

#### Environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`clientId`|Client ID|`obj['clientId']`, `process.env['SSO_CLIENT_ID']`|**optional**|-|-|
|`ssoURL`|Sso URL|`obj['ssoURL']`, `process.env['SSO_SSO_URL']`|**isNotEmpty** (ssoURL should not be empty)|-|-|
|`redirectURL`|Redirect URL|`obj['redirectURL']`, `process.env['SSO_REDIRECT_URL']`|**isNotEmpty** (redirectURL should not be empty)|-|-|
|`adminSecret`|Admin secret|`obj['adminSecret']`, `process.env['SSO_ADMIN_SECRET']`|**optional**|-|-|
|`allowedExternalAppIds`|Allowed identifiers of external applications, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing|`obj['allowedExternalAppIds']`, `process.env['SSO_ALLOWED_EXTERNAL_APP_IDS']`|**optional**|-|-|

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`extraHeaders`|Extra headers|**optional**|-|-|
|`getRequestFromContext`|Function for resolve request from execution context|**optional**|```getRequestFromExecutionContext```|-|
|`checkAccessValidator`|External function for validate permissions|**optional**|```defaultSsoCheckAccessValidator```|-|
|`externalUserIdHeaderName`|A header for searching for an external user ID, if you have logged in previously and do not need to log in again in the authorization service, can be used during testing|**optional**|```x-external-user-id```|-|
|`externalAppIdHeaderName`|Header for searching for external application identifiers, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing|**optional**|```x-external-app-id```|-|
|`getSsoUserFromExternalUserId`|Function for resolve sso user by externalUserId|**optional**|```defaultSsoGetSsoUserFromExternalUserId```|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/sso
[npm-url]: https://npmjs.org/package/@nestjs-mod/sso
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/sso
[downloads-url]: https://npmjs.org/package/@nestjs-mod/sso
