
# @nestjs-mod/cache-manager

A cache module for nodejs that allows easy wrapping of functions in cache, tiered caches, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/cache-manager)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save redis@4.6.7 cache-manager@5.4.0 cache-manager-redis-yet@4.1.2 @nestjs-mod/cache-manager
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [CacheManagerModule](#cachemanagermodule) | core | A cache module for nodejs that allows easy wrapping of functions in cache, tiered caches, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/cache-manager) |


## Modules descriptions

### CacheManagerModule
A cache module for nodejs that allows easy wrapping of functions in cache, tiered caches, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/cache-manager)

#### Use in NestJS
Use with forRoot options.

```typescript
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { CacheManagerModule, CacheManagerService } from '@nestjs-mod/cache-manager';
import { isInfrastructureMode } from '@nestjs-mod/common';
import { Injectable, Module } from '@nestjs/common';

const userFeatureName = 'prisma-user';

@Injectable()
export class AppService {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  async setCache({ externalUserId }: { externalUserId: string }) {
    return await this.cacheManagerService.set('cache', externalUserId, 0);
  }

  async getCache() {
    return await this.cacheManagerService.get('cache');
  }
}

process.env.PRISMA_USER_REDIS_URL = 'redis://:redis_password@localhost:6379';

@Module({
  imports: [
    CacheManagerModule.forRoot({
      staticConfiguration: {
        type: isInfrastructureMode() ? 'memory' : 'redis',
        cacheFeatureName: userFeatureName,
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const service = app.get<AppService>(AppService);
  const externalUserId = randomUUID();
  await service.setCache({ externalUserId });
  console.log(await service.getCache()); // output: '568a823e-65ea-46ba-aa57-0194ee67e0f9'
}

bootstrap();
```

An example of access to module services with forFeature.

```typescript
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { CacheManagerModule, CacheManagerService } from '@nestjs-mod/cache-manager';
import { isInfrastructureMode } from '@nestjs-mod/common';
import { Injectable, Module } from '@nestjs/common';

const userFeatureName = 'prisma-user';

@Injectable()
export class FeatureService {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  async setCache({ externalUserId }: { externalUserId: string }) {
    return await this.cacheManagerService.set('cache', externalUserId, 0);
  }

  async getCache() {
    return await this.cacheManagerService.get('cache');
  }
}
@Module({
  imports: [
    CacheManagerModule.forFeature({
      featureModuleName: 'FeatureModule',
    }),
  ],
  providers: [FeatureService],
})
export class FeatureModule {}

process.env.PRISMA_USER_REDIS_URL = 'redis://:redis_password@localhost:6379';

@Module({
  imports: [
    CacheManagerModule.forRoot({
      staticConfiguration: {
        type: isInfrastructureMode() ? 'memory' : 'redis',
        cacheFeatureName: userFeatureName,
      },
    }),
    FeatureModule,
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const service = app.get<FeatureService>(FeatureService);
  const externalUserId = randomUUID();
  await service.setCache({ externalUserId });
  console.log(await service.getCache()); // output: '568a823e-65ea-46ba-aa57-0194ee67e0f9'
}

bootstrap();
```


#### Use in NestJS-mod
An example of using forRoot with parameters, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-cache-manager.

For work with Redis, you must first connect the Docker Compose module and the Docker Compose module to work with the Redis.

```typescript
import { CacheManagerModule } from '@nestjs-mod/cache-manager';
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeRedis } from '@nestjs-mod/docker-compose';
import { join } from 'path';
import { userFeatureName } from './app/app.constants';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-cache-manager');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-cache-manager',
            PACKAGE_JSON_FILE
          ),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
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
    core: [
      CacheManagerModule.forRoot({
        staticConfiguration: {
          type: isInfrastructureMode() ? 'memory' : 'redis',
          cacheFeatureName: userFeatureName,
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
      DockerComposeRedis.forRoot({ staticConfiguration: { featureName: userFeatureName } }),
    ],
  },
});
```

New environment variable

```bash
EXAMPLE_CACHE_MANAGER_CACHE_MANAGER_USER_REDIS_URL=redis://:redis_password@localhost:6379
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Shared providers
`CacheManagerService`

#### Environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`redisUrl`|Connection string for Redis, if it empty memoryStore use for store data (example: redis://:redis_password@localhost:6379)|`obj['redisUrl']`, `process.env['REDIS_URL']`|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`type`|Type of storage for store data (memory or redis)|**optional**|```memory```|-|
|`defaultLogger`|Default logger|**optional**|-|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`ttl`|TTL|**optional**|-|-|
|`refreshThreshold`|Refresh threshold|**optional**|-|-|
|`isCacheable`|Is cacheable|**optional**|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/cache-manager
[npm-url]: https://npmjs.org/package/@nestjs-mod/cache-manager
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/cache-manager
[downloads-url]: https://npmjs.org/package/@nestjs-mod/cache-manager
