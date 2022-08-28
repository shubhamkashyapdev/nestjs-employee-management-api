import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  //@todo - restricted
  @Query(() => [User], { name: 'getAllUsers' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUserByUsername' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Query(() => User, { name: 'getCurrentUser' })
  @UseGuards(JwtAuthGuard)
  findCurrentUser(@Context() context) {
    //@todo - get current user details
    console.log({ user: context.user, body: context.body, })
    return {
      id: "123",
      username: "dummy",
    }
  }
}
