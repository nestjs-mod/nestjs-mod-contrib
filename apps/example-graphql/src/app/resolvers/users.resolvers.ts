import { Request } from '@nestjs-mod/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StatusDto } from './dto/status.dto';
import { CreateUserDto, UserDto } from './dto/user.dto';

@Resolver()
export class UsersResolvers {
  private readonly usersStorage: UserDto[] = [
    { id: 1, username: 'admin', custom: { one: 1 } },
    { id: 2, username: 'user', custom: { two: 2 } },
  ];

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
}
