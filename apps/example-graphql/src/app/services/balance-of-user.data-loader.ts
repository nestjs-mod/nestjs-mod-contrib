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
