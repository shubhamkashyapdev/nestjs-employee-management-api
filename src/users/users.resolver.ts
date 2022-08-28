import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { HttpException, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from './role.enum'
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/auth-role.guard';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  //@todo - restricted
  @Query(() => [User], { name: 'getAllUsers' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context('req') req) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUserByUsername' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Args('username') username: string) {
    const userData = await this.usersService.findByUsernameE(username);

    return userData;
  }

  @Query(() => User, { name: 'getCurrentUser' })
  @UseGuards(JwtAuthGuard)
  findCurrentUser(@Context('req') req) {
    //@todo - get current user details
    const user = req.user
    const userData = this.usersService.findByUsernameE(user.username)

    return userData;
  }

  @Query(() => User, { name: 'getUserPassword' })
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserPassword(@Args('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    return user;
  }
}
