import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createOne(email: string, password: string): Promise<User> {
    try {
      const existingUser = await this.findOne(email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const newUser = this.userRepository.create({
        email,
        password,
      });

      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      throw error;
    }
  }
}
