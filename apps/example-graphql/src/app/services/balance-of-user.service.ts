import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PubSub } from 'graphql-subscriptions';
import { CHANGE_USER_BALANCE_EVENT, UserBalanceDto } from '../resolvers/dto/user-balance.dto';
import { isInfrastructureMode } from '@nestjs-mod/common';

@Injectable()
export class BalanceOfUserService extends PubSub implements OnModuleInit, OnModuleDestroy {
  changeBalanceIntervalRef?: NodeJS.Timer;

  onModuleInit() {
    if (!isInfrastructureMode()) {
      this.changeBalanceIntervalRef = setInterval(() => {
        this.publish(CHANGE_USER_BALANCE_EVENT, { amount: randomInt(1000, 9999), userId: 2 } as UserBalanceDto).then();
      }, 3000);
    }
  }

  onModuleDestroy() {
    if (this.changeBalanceIntervalRef) {
      clearInterval(this.changeBalanceIntervalRef);
    }
  }

  async getUserBalanceByUserIds(userIds: number[] | readonly number[]) {
    return userIds.map(
      (userId) =>
        ({
          amount: userId * 1000,
          userId: userId,
        } as UserBalanceDto)
    );
  }
}
