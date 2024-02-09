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
        requestId: req.headers[X_REQUEST_ID],
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
