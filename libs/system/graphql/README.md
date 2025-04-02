
# @nestjs-mod/graphql

GraphQL packages, providing an easy way to use GraphQL with the NestJS-mod, integrated: dataloader, included support for pipes, filters and interceptors in resolver fields, works with Fastify (Wrapper for https://docs.nestjs.com/graphql/quick-start)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs/apollo @apollo/server @nestjs/graphql @as-integrations/fastify graphql-type-json@0.3.2 @graphql-tools/utils@10.0.13 dataloader@2.0.0 graphql@16.8.1 @nestjs-mod/graphql
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [GraphqlModule](#graphqlmodule) | system | GraphQL packages, providing an easy way to use GraphQL with the NestJS-mod, integrated: dataloader, included support for pipes, filters and interceptors in resolver fields, works with Fastify (Wrapper for https://docs.nestjs.com/graphql/quick-start) |


## Modules descriptions

### GraphqlModule
GraphQL packages, providing an easy way to use GraphQL with the NestJS-mod, integrated: dataloader, included support for pipes, filters and interceptors in resolver fields, works with Fastify (Wrapper for https://docs.nestjs.com/graphql/quick-start)

#### Use in NestJS
Example of `main.ts`

```typescript
import { GRAPHQL_SCHEMA_FILE, GraphqlModule } from '@nestjs-mod/graphql';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-graphql');

@Module({
  imports: [
    GraphqlModule.forRoot({
      configuration: {
        autoSchemaFile: join(appFolder, GRAPHQL_SCHEMA_FILE),
      },
    }),
    AppModule.forRoot(),
  ],
})
export class RootModule {}

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  await app.listen(3005);
}

bootstrap();
```

Example of dataloader

```typescript
import { GraphqlDataLoader } from '@nestjs-mod/graphql';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { UserBalanceDto } from '../resolvers/dto/user-balance.dto';
import { BalanceOfUserService } from './balance-of-user.service';
@Injectable()
export class BalanceOfUserDataloader implements GraphqlDataLoader<number, UserBalanceDto> {
  constructor(private readonly balanceOfUserService: BalanceOfUserService) {}

  generateDataLoader(): DataLoader<number, UserBalanceDto> {
    return new DataLoader<number, UserBalanceDto>(async (userIds) =>
      this.balanceOfUserService.getUserBalanceByUserIds(userIds)
    );
  }
}
```

Examples of resolver fields with dataloader and without

```typescript
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRequestFromExecutionContext } from '@nestjs-mod/common';
import { Loader } from '@nestjs-mod/graphql';
import { NestjsPinoAsyncLocalStorage, X_REQUEST_ID } from '@nestjs-mod/pino';
import { Logger } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { BalanceOfUserDataloader } from '../services/balance-of-user.data-loader';
import { BalanceOfUserService } from '../services/balance-of-user.service';
import { CHANGE_USER_BALANCE_EVENT, UserBalanceDto } from './dto/user-balance.dto';
import { UserDto } from './dto/user.dto';

@Resolver(UserDto)
export class BalanceOfUserResolver {
  constructor(private readonly balanceOfUserService: BalanceOfUserService) {}

  @ResolveField('balance', () => UserBalanceDto)
  async balance(
    @Parent()
    userDto: UserDto
  ): Promise<UserBalanceDto> {
    return (await this.balanceOfUserService.getUserBalanceByUserIds([userDto.id]))[0];
  }

  @ResolveField('balanceOverDataLoader', () => UserBalanceDto)
  async balanceOverDataLoader(
    @Parent()
    userDto: UserDto,
    @Loader(BalanceOfUserDataloader)
    balanceOfUserDataloader: DataLoader<number, UserBalanceDto>
  ) {
    return await balanceOfUserDataloader.load(userDto.id);
  }
}
```

Example of work with headers

```typescript
import { Request } from '@nestjs-mod/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StatusDto } from './dto/status.dto';
import { CreateUserDto, UserDto } from './dto/user.dto';

@Resolver()
export class UsersResolvers {
  static logger = new Logger(UsersResolvers.name);

  private readonly usersStorage: UserDto[] = [
    { id: 1, username: 'admin', custom: { one: 1 } },
    { id: 2, username: 'user', custom: { two: 2 } },
  ];

  constructor(private readonly balanceOfUserService: BalanceOfUserService) {}

  @Query(() => [UserDto])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async users(@Request() req: any): Promise<UserDto[]> {
    if (req.headers['x-throw-error']) {
      throw new Error('Error from query!');
    }
    return this.usersStorage;
  }

  @Mutation(() => StatusDto)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createUser(@Request() req: any, @Args() userDto: CreateUserDto) {
    if (req.headers['x-throw-error']) {
      throw new Error('Error from mutation!');
    }
    this.usersStorage.push({ ...userDto, id: +userDto.id });
    return { status: 'OK' };
  }

  @Subscription(() => UserBalanceDto, {
    name: CHANGE_USER_BALANCE_EVENT,
    filter: (payload: UserBalanceDto, variables: { userId: string }) => {
      return payload.userId === +variables.userId;
    },
    resolve: (payload: UserBalanceDto, _args, ctx) => {
      const req = getRequestFromExecutionContext(ctx);
      BalanceOfUserResolver.logger.log({
        requestId: req.headers?.[X_REQUEST_ID],
      });
      // todo: requestId from request not apply in logger
      BalanceOfUserResolver.logger.log({ [CHANGE_USER_BALANCE_EVENT]: payload });
      if (req.headers['x-throw-error']) {
        throw new Error('Error from subscription!');
      }
      return payload;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChangeUserBalance(@Args('userId') userId: string) {
    return this.balanceOfUserService.asyncIterator<UserBalanceDto>(CHANGE_USER_BALANCE_EVENT);
  }
}
```


#### Use in NestJS-mod
An example of using forRoot with parameters and use dataloader, resolver fields and subscriptions, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-graphql.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { FastifyNestApplicationInitializer, FastifyNestApplicationListener } from '@nestjs-mod/fastify';
import { GRAPHQL_SCHEMA_FILE, GraphqlModule } from '@nestjs-mod/graphql';
import { NestjsPinoLoggerModule } from '@nestjs-mod/pino';
import { ECOSYSTEM_CONFIG_FILE, Pm2 } from '@nestjs-mod/pm2';
import { TerminusHealthCheckModule } from '@nestjs-mod/terminus';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { AppModule } from './app/app.module';

const platform = process.env.PLATFORM === 'fastify' ? 'fastify' : 'express';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-graphql');

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
      platform === 'express'
        ? DefaultNestApplicationInitializer.forRoot({ staticConfiguration: { bufferLogs: true } })
        : FastifyNestApplicationInitializer.forRoot({ staticConfiguration: { bufferLogs: true } }),
      NestjsPinoLoggerModule.forRoot(),
      TerminusHealthCheckModule.forRootAsync({
        configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
          standardHealthIndicators: [
            { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
          ],
        }),
        inject: [MemoryHealthIndicator],
      }),
      platform === 'express'
        ? DefaultNestApplicationListener.forRoot({
            staticConfiguration: {
              // When running in infrastructure mode, the backend server does not start.
              mode: isInfrastructureMode() ? 'silent' : 'listen',
            },
          })
        : FastifyNestApplicationListener.forRoot({
            staticConfiguration: {
              // When running in infrastructure mode, the backend server does not start.
              mode: isInfrastructureMode() ? 'silent' : 'listen',
            },
          }),
      GraphqlModule.forRoot({
        configuration: {
          autoSchemaFile: join(appFolder, GRAPHQL_SCHEMA_FILE),
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
      Pm2.forRoot({
        configuration: {
          ecosystemConfigFile: join(rootFolder, ECOSYSTEM_CONFIG_FILE),
          applicationScriptFile: join('dist/apps/example-graphql/main.js'),
        },
      }),
    ],
  },
});
```


#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`path`|Path to mount GraphQL API|**optional**|```/graphql```|-|
|`typeDefs`|Type definitions|**optional**|-|-|
|`typePaths`|Paths to files that contain GraphQL definitions|**optional**|-|-|
|`driver`|GraphQL server adapter|**optional**|ApolloDriver extends apollo_base_driver_1.ApolloBaseDriver|-|
|`include`|An array of modules to scan when searching for resolvers|**optional**|-|-|
|`directiveResolvers`|Directive resolvers|**optional**|-|-|
|`schema`|Optional GraphQL schema (to be used or to be merged)|**optional**|-|-|
|`resolvers`|Extra resolvers to be registered|**optional**|-|-|
|`definitions`|TypeScript definitions generator options|**optional**|-|-|
|`autoSchemaFile`|If enabled, GraphQL schema will be generated automatically|**optional**|```schema.gql```|-|
|`sortSchema`|Sort the schema lexicographically|**optional**|-|-|
|`buildSchemaOptions`|Options to be passed to the schema generator, only applicable if "autoSchemaFile" = true|**optional**|-|-|
|`useGlobalPrefix`|Prepends the global prefix to the url @see [faq/global-prefix](Global Prefix)|**optional**|-|-|
|`fieldResolverEnhancers`|Enable/disable enhancers for @ResolveField()|**optional**|[ ```interceptors```, ```guards```, ```filters``` ]|-|
|`resolverValidationOptions`|Resolver validation options|**optional**|-|-|
|`inheritResolversFromInterfaces`|Inherit missing resolvers from their interface types defined in the resolvers object|**optional**|-|-|
|`transformSchema`|Function to be applied to the schema letting you register custom transformations|**optional**|-|-|
|`transformAutoSchemaFile`|Apply `transformSchema` to the `autoSchemaFile`|**optional**|-|-|
|`context`|Context function|**optional**|```defaultContextFunction```|-|
|`metadata`|Extra static metadata to be loaded into the specification|**optional**|-|-|
|`installSubscriptionHandlers`|If enabled, "subscriptions-transport-ws" will be automatically registered|**optional**|```true```|-|
|`subscriptions`|Subscriptions configuration|**optional**|```{"graphql-ws":{"path":"/graphql"}}```|-|
|`playground`|GraphQL playground options|**optional**|```{"settings":{"request.credentials":"include"}}```|-|
|`autoTransformHttpErrors`|If enabled, will register a global interceptor that automatically maps "HttpException" class instances to corresponding Apollo errors|**optional**|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/graphql
[npm-url]: https://npmjs.org/package/@nestjs-mod/graphql
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/graphql
[downloads-url]: https://npmjs.org/package/@nestjs-mod/graphql
