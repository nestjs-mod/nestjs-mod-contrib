
# @nestjs-mod/sso

NestJS SDK for Single Sign-On on NestJS and Angular with webhooks and social authorization (Wrapper for https://www.npmjs.com/package/@nestjs-mod/sso-rest-sdk)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/sso-rest-sdk@1.0.5 @nestjs-mod/sso
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [SsoModule](#ssomodule) | core | NestJS SDK for Single Sign-On on NestJS and Angular with webhooks and social authorization (Wrapper for https://www.npmjs.com/package/@nestjs-mod/sso-rest-sdk) |


## Modules descriptions

### SsoModule
NestJS SDK for Single Sign-On on NestJS and Angular with webhooks and social authorization (Wrapper for https://www.npmjs.com/package/@nestjs-mod/sso-rest-sdk)

#### Use in NestJS-mod
An example of using Single Sign-On, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-sso/INFRASTRUCTURE.MD.

**AppService**
```typescript
import { SsoService } from '@nestjs-mod/sso';
import { SsoErrorEnum, SsoRole } from '@nestjs-mod/sso-rest-sdk';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isAxiosError } from 'axios';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(private readonly ssoService: SsoService) { }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getProfile(headers?: Record<string, string>) {
    try {
      const profileResult = await this.ssoService.getSsoClient().getSsoApi().ssoControllerProfile({ headers })
      return profileResult.data
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Unhandled error', HttpStatus.BAD_REQUEST);
    }
  }


  async signIn(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<string | undefined> {
    try {
      const signupUserResult = await this.ssoService.getSsoClient().getSsoApi().ssoControllerSignIn({
        password: user.password,
        email: user.email.toLowerCase(),
        fingerprint: 'fingerprint'
      });
      return signupUserResult.data?.accessToken;
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Unhandled error', HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<void | null> {
    try {
      const signupUserResult = await this.ssoService.getSsoClient().getSsoApi().ssoControllerSignUp({
        username: user.username,
        password: user.password,
        confirmPassword: user.password,
        email: user.email.toLowerCase(),
        fingerprint: 'fingerprint'
      });
      await this.ssoService
        .getSsoClient(true)
        .getSsoApi()
        .ssoUsersControllerUpdateOne(signupUserResult.data.user.id, {
          roles: SsoRole.User.toLowerCase(),
        });

      await this.verifyUser({
        externalUserId: signupUserResult.data.user.id,
        email: signupUserResult.data.user.email,
      });

      this.logger.debug(
        `User with email: ${signupUserResult.data.user.email} successfully created!`
      );
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.data?.code !== SsoErrorEnum.Sso011 && err.response?.data?.code !== SsoErrorEnum.Sso003) {
          this.logger.debug(err.response?.data);
          this.logger.debug(err, err.stack);
          if (err.response?.data?.message) {
            throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
          }
        }
      }
      throw new HttpException('Failed to create a user', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser({
    externalUserId,
    email,
  }: {
    externalUserId: string;
    email: string;
  }) {
    await this.ssoService
      .getSsoClient(true)
      .getSsoApi()
      .ssoUsersControllerUpdateOne(externalUserId, {
        emailVerifiedAt: new Date().toISOString(),
        email,
      });
    return this;
  }
}

```

**AppController**
```typescript
import { Controller, Get, Param } from '@nestjs/common';

import { AllowEmptySsoUser } from '@nestjs-mod/sso';
import { AppService } from './app.service';

@AllowEmptySsoUser()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/sign-up/:email/:password')
  async signUp(@Param('email') email: string, @Param('password') password: string) {
    await this.appService.signUp({
      email, password
    });
    return { status: 'OK' };
  }

  @Get('/sign-in/:email/:password')
  async signIn(@Param('email') email: string, @Param('password') password: string) {
    const token = await this.appService.signIn({
      email, password
    });
    return { token };
  }

  @Get('/prifile/:token')
  async profile(@Param('token') token: string) {
    return this.appService.getProfile({ Authorization: `Bearer ${token}` });
  }
}

```

**AppModule**
```typescript
import { SsoModule } from '@nestjs-mod/sso';
import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [SsoModule.forFeature()],
  moduleCategory: NestModuleCategory.feature,
  controllers: [AppController],
  providers: [AppService],
});

```


#### Shared providers
`SsoService`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`checkAccessValidator`|External function for validate permissions|**optional**|```defaultSsoCheckAccessValidator```|-|

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`url`|Sso URL|`obj['url']`, `process.env['SSO_URL']`|**isNotEmpty** (url should not be empty)|-|-|
|`adminSecret`|Sso admin secret|`obj['adminSecret']`, `process.env['SSO_ADMIN_SECRET']`|**isNotEmpty** (adminSecret should not be empty)|-|-|
|`useGuards`|Use guards|`obj['useGuards']`, `process.env['SSO_USE_GUARDS']`|**optional**|```true```|```true```|
|`useFilters`|Use filters|`obj['useFilters']`, `process.env['SSO_USE_FILTERS']`|**optional**|```true```|```true```|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |

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
