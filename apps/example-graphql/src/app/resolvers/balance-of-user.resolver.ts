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
  static logger = new Logger(BalanceOfUserResolver.name);

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
