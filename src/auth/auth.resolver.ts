import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginUserInput } from './dto/login.user.input';
import { GqlAuthGuard } from './gql.auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }
    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(loginUserInput);
    }

    @Mutation(() => User, { name: "signup" })
    signup(@Args('userInput') userInput: CreateUserInput) {
        return this.authService.signup(userInput)
    }

}
