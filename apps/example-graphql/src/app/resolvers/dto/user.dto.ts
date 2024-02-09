import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class UserDto {
  @Field()
  id!: number;

  @Field()
  username!: string;

  @Field(() => GraphQLJSON)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom!: any;
}

@ArgsType()
export class CreateUserDto {
  @Field()
  id!: string;

  @Field()
  username!: string;

  @Field(() => GraphQLJSON)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom!: any;
}
