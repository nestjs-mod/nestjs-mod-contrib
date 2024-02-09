import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StatusDto {
  @Field()
  status!: string;
}
