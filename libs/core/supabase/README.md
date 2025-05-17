
# @nestjs-mod/supabase

NestJS JavaScript Client for Supabase (Wrapper for https://www.npmjs.com/package/@supabase/supabase-js)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @supabase/supabase-js@2.49.4 @nestjs-mod/supabase
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [SupabaseModule](#supabasemodule) | core | NestJS JavaScript Client for Supabase (Wrapper for https://www.npmjs.com/package/@supabase/supabase-js) |


## Modules descriptions

### SupabaseModule
NestJS JavaScript Client for Supabase (Wrapper for https://www.npmjs.com/package/@supabase/supabase-js)

#### Use in NestJS-mod
An example of using Supabase, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-supabase/INFRASTRUCTURE.MD.

**Test urls**
```
// http://localhost:3000/api/sign-up/a1@email.com/A@@a12345678
// http://localhost:3000/api/sign-in/a1@email.com/A@@a12345678
// http://localhost:3000/api/profile/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd2VkX3JvbGVzIjpbInVzZXIiXSwiYXVkIjoiYTJlZDA5ZTEtZmZkMS00YjQ3LWE1MjktZTUzYWU1NDVlZTY1IiwiZXhwIjoxNzQ2NzczODQ3LCJpYXQiOjE3NDY3NzIwNDcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImxvZ2luX21ldGhvZCI6ImJhc2ljX2F1dGgiLCJub25jZSI6IjdhNzRkOTNhLTNjZDItNDgxMi1hZjY2LTZlMTZiYzZlYjljZCIsInJvbGVzIjpbInVzZXIiXSwic2NvcGUiOlsib3BlbmlkIiwiZW1haWwiLCJwcm9maWxlIl0sInN1YiI6ImEzYjYyZTUwLTQ2Y2MtNDZlNC1iYWRiLTkyYWUwYzhmNGE4ZSIsInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4ifQ.KUVZ82-wI1V5OhFLF6xUp10b_T4947PMRpnvGlHVTm9A-EBHcl3OzXAxNl5pjbSLdHICVCpiG1zxDOlFoM1kHsTgeG7yBSc5CHFzlAGlPtgYW9wU6exQZ2sidifX3RGcD2nQ0yOaFv0YYURO7AHPP15CIvdsUPZ3016SwAM5JuGjqdriT-5aFHZFMkiHAdETYoGy2oyXQimMdyBxA1ciKKlykhLgEXTvgebqPguKEHj6Vxp3DEpNu3Y0Bm2K9Wog5dgci6rO8ojdsPoni_iyYVJIxdDhdBdax2824uVpgXDDueAKJ6nUQ9v50MlRSj6b5T3gjOETnar8U8bIH0hjZA
```

**AppService**
```typescript
import { SupabaseService } from '@nestjs-mod/supabase';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isAxiosError } from 'axios';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(private readonly supabaseService: SupabaseService) { }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getTokenFromHeader(headers?: Record<string, string>) {
    try {
      return Object.entries(headers || {}).map(([key, value]) => [key.toLowerCase(), value]).find(([key, value]) => key === 'authorization')?.[1]?.split('Bearer ')?.[1]
    } catch (er) {
      return ''
    }
  }

  async getProfile(headers?: Record<string, string>) {
    try {
      const profileResult = await this.supabaseService.getSupabaseClient().auth.getUser(this.getTokenFromHeader(headers))
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
      const signupUserResult = await this.supabaseService.getSupabaseClient().auth.signInWithPassword({
        password: user.password,
        email: user.email.toLowerCase(),
      });
      return signupUserResult.data?.session?.access_token;
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
      const signupUserResult = await this.supabaseService.getSupabaseClient().auth.signUp({
        password: user.password,
        email: user.email.toLowerCase()
      });

      if (signupUserResult.data.user && signupUserResult.data.user.email) {
        await this.verifyUser({
          externalUserId: signupUserResult.data.user.id!,
          email: signupUserResult.data.user.email,
        });
      }

      this.logger.debug(
        `User with email: ${signupUserResult.data.user?.email} successfully created!`
      );
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
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
    // for auto verify set in "https://supabase.com/dashboard/project/asuvykozhdurwmnfdhwj/auth/providers?provider=Email - Confirm email" to false
    return this;
  }
}

```

**AppController**
```typescript
import { Controller, Get, Param } from '@nestjs/common';

import { AllowEmptySupabaseUser } from '@nestjs-mod/supabase';
import { AppService } from './app.service';

@AllowEmptySupabaseUser()
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

  @Get('/profile/:token')
  async profile(@Param('token') token: string) {
    return this.appService.getProfile({ Authorization: `Bearer ${token}` });
  }
}

```

**AppModule**
```typescript
import { SupabaseModule } from '@nestjs-mod/supabase';
import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [SupabaseModule.forFeature()],
  moduleCategory: NestModuleCategory.feature,
  controllers: [AppController],
  providers: [AppService],
});

```

**main.ts**
```typescript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {
  bootstrapNestApplication,
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  isInfrastructureMode,
  PACKAGE_JSON_FILE,
  ProjectUtils,
} from '@nestjs-mod/common';
import { SupabaseModule } from '@nestjs-mod/supabase';
import { join } from 'path';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-supabase');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps/example-supabase', PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, 'apps', 'example-supabase', '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
    feature: [
      SupabaseModule.forRootAsync({
        staticEnvironments: {
          // Supabase URL (https://supabase.com/dashboard/project/XXX/settings/api - API Settings - Project URL - URL)
          url: 'https://asuvykozhdurwmnfdhwj.supabase.co',
          // Supabase key (https://supabase.com/dashboard/project/XXX/settings/api - API Settings - Project API Keys - anon public)
          key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdXZ5a296aGR1cndtbmZkaHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjQ1MTksImV4cCI6MjA2MjkwMDUxOX0.Xe0eHD_cNhiMGaKfwP53-_0XhZ09oaC5OKQ4gsPbwV0'
        },
      }),
      AppModule.forRoot()
    ],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
          style: 'pretty',
        },
      }),
    ],
  },
});

```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Shared providers
`SupabaseService`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`extraHeaders`|Extra headers|**optional**|-|-|
|`checkAccessValidator`|External function for validate permissions|**optional**|```defaultSupabaseCheckAccessValidator```|-|
|`externalUserIdHeaderName`|A header for searching for an external user ID, if you have logged in previously and do not need to log in again in the authorization service, can be used during testing|**optional**|```x-external-user-id```|-|
|`externalAppIdHeaderName`|Header for searching for external application identifiers, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing|**optional**|```x-external-app-id```|-|
|`getSupabaseUserFromExternalUserId`|Function for resolve supabase user by externalUserId|**optional**|```defaultSupabaseGetSupabaseUserFromExternalUserId```|-|
|`clientOptions`|Supabase client options|**optional**|-|-|

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`url`|Supabase URL (https://supabase.com/dashboard/project/XXX/settings/api - API Settings - Project URL - URL)|`obj['url']`, `process.env['SUPABASE_URL']`|**isNotEmpty** (url should not be empty)|-|-|
|`key`|Supabase key (https://supabase.com/dashboard/project/XXX/settings/api - API Settings - Project API Keys - anon public)|`obj['key']`, `process.env['SUPABASE_KEY']`|**isNotEmpty** (key should not be empty)|-|-|
|`allowedExternalAppIds`|Allowed identifiers of external applications, if you have logged in previously and do not need to log in again in the authorization service, these identifiers must be private and can be used for testing|`obj['allowedExternalAppIds']`, `process.env['SUPABASE_ALLOWED_EXTERNAL_APP_IDS']`|**optional**|-|-|
|`useGuards`|Use guards|`obj['useGuards']`, `process.env['SUPABASE_USE_GUARDS']`|**optional**|```true```|```true```|
|`useFilters`|Use filters|`obj['useFilters']`, `process.env['SUPABASE_USE_FILTERS']`|**optional**|```true```|```true```|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/supabase
[npm-url]: https://npmjs.org/package/@nestjs-mod/supabase
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/supabase
[downloads-url]: https://npmjs.org/package/@nestjs-mod/supabase
