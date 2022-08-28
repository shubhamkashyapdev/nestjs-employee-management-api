import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    let user: User = this.userRepository.create(createUserInput);
    user.role = 'user'
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } })
  }

  // user not found exception handled
  async findByUsernameE(username: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) {
      throw new NotFoundException('User not found!')
    }
    return user
  }

  async findByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } })
    return user
  }
}
