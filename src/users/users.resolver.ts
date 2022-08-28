import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/auth-role.guard';
import { Roles } from '../auth/role.decorator';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  //@todo - restricted
  @Query(() => [User], { name: 'getAllUsers' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context('req') req) {
    return this.usersService.findAll();
  }

  //@todo: restricted (ADMIN)
  @Query(() => User, { name: 'getUserByUsername' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Query(() => User, { name: 'getCurrentUser' })
  @UseGuards(JwtAuthGuard)
  findCurrentUser(@Context('req') req) {
    //@todo - get current user details
    const user = req.user
    if (!user) {
      throw new HttpException('User does not exists!', 400);
    }
    return this.usersService.findByUsername(user.username)
  }
}
