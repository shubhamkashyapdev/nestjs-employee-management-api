import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login.user.input';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (user && user.password === password) {
            const { password, ...result } = user
            return result;
        } else {
            null
        }

    }

    async login(loginUserInput: LoginUserInput) {
        const { password, ...result } = await this.usersService.findByUsername(loginUserInput.username);
        return {
            access_token: this.jwtService.sign({ username: result.username, sub: result.id }),
            user: result
        }
    }

    async signup(loginUserInput: LoginUserInput): Promise<User> {
        const user = await this.usersService.findByUsername(loginUserInput.username)
        if (user) {
            throw new BadRequestException('User already exists!')
        }
        const passwordH = await bcrypt.hash(loginUserInput.password, 10);
        return this.usersService.create({ ...loginUserInput, password: passwordH })

    }
}
