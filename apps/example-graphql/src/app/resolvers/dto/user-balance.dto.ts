import { Field, ObjectType } from '@nestjs/graphql';

export const CHANGE_USER_BALANCE_EVENT = 'changeUserBalanceEvent';

@ObjectType()
export class UserBalanceDto {
  @Field()
  userId!: number;

  @Field()
  amount!: number;
}
