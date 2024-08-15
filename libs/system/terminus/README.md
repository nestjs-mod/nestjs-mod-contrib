
# @nestjs-mod/terminus

Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs/terminus @nestjs-mod/terminus
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [TerminusHealthCheckModule](#terminushealthcheckmodule) | system | Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus) |


## Modules descriptions

### TerminusHealthCheckModule
Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)

#### Use in NestJS
Example of use feature configurations and use standardHealthIndicators.

```typescript
import { TerminusHealthCheckModule, TerminusHealthCheckFeatureConfiguration } from '@nestjs-mod/terminus';
import { NestFactory } from '@nestjs/core';

import { Module } from '@nestjs/common';
import { HealthIndicatorStatus, MemoryHealthIndicator } from '@nestjs/terminus';

export class FeatureTerminusHealthCheckFeatureConfiguration implements TerminusHealthCheckFeatureConfiguration {
  name = 'Feature';
  async isHealthy() {
    return {
      feature: {
        status: 'up' as HealthIndicatorStatus,
      },
    };
  }
}

@Module({
  imports: [
    TerminusHealthCheckModule.forFeature({
      featureModuleName: 'feature',
      featureConfiguration: new FeatureTerminusHealthCheckFeatureConfiguration(),
    }),
  ],
})
export class FeatureModule {}

@Module({
  imports: [
    TerminusHealthCheckModule.forRootAsync({
      configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
        standardHealthIndicators: [
          { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
        ],
      }),
      inject: [MemoryHealthIndicator],
    }),
    FeatureModule,
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```


#### Use in NestJS-mod
An example of using forRoot with parameters and use feature configurations with use standardHealthIndicators, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-terminus.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  bootstrapNestApplication,
  createNestModule,
} from '@nestjs-mod/common';
import { TerminusHealthCheckModule, TerminusHealthCheckFeatureConfiguration } from '@nestjs-mod/terminus';
import { HealthIndicatorStatus, MemoryHealthIndicator } from '@nestjs/terminus';

export class FeatureTerminusHealthCheckFeatureConfiguration implements TerminusHealthCheckFeatureConfiguration {
  name = 'Feature';
  async isHealthy() {
    return {
      feature: {
        status: 'up' as HealthIndicatorStatus,
      },
    };
  }
}

export const { FeatureModule } = createNestModule({
  moduleName: 'FeatureModule',
  imports: [
    TerminusHealthCheck.forFeature({
      featureModuleName: 'feature',
      featureConfiguration: new FeatureTerminusHealthCheckFeatureConfiguration(),
    }),
  ],
});

bootstrapNestApplication({
  modules: {
    system: [
      DefaultNestApplicationInitializer.forRoot(),
      TerminusHealthCheckModule.forRootAsync({
        configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
          standardHealthIndicators: [
            { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
          ],
        }),
        inject: [MemoryHealthIndicator],
      }),
      DefaultNestApplicationListener.forRoot({ staticEnvironments: { port: 3000 } }),
    ],
    feature: [FeatureModule.forRoot()],
  },
});
```


#### Shared providers
`TerminusHealthCheckService`

#### Shared imports
`TerminusModule`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`standardHealthIndicators`|Standard health indicators @see https://docs.nestjs.com/recipes/terminus#setting-up-a-healthcheck|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`endpoint`|Rest endpoint for health check|**optional**|```health```|-|
|`errorLogStyle`|The style of the error logger @default 'json'|**optional**|-|-|
|`logger`|The logger to use. Either default logger or your own.|**optional**|-|-|
|`gracefulShutdownTimeoutMs`|The timeout to wait in ms before the application shuts down @default 0|**optional**|-|-|

#### Feature configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`name`|Name of health check|**isNotEmpty** (name should not be empty)|-|-|
|`isHealthy`|Logic for health check|**isNotEmpty** (isHealthy should not be empty)|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/terminus
[npm-url]: https://npmjs.org/package/@nestjs-mod/terminus
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/terminus
[downloads-url]: https://npmjs.org/package/@nestjs-mod/terminus
