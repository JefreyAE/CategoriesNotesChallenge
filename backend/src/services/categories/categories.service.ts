import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/models/category/category.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(userId: any): Promise<CategoryEntity[]> {
    try {
      const categories = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.user', 'user')
        .where('user.id = :userId', { userId })
        .getMany();

      return categories;
    } catch (error) {
      throw error;
    }
  }

  async createOne(
    category: Partial<CategoryEntity>,
    userId: any,
  ): Promise<CategoryEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newCategory = this.categoryRepository.create({ ...category, user });
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category with this name already exists');
      } else {
        throw error;
      }
    }
  }

  async removeOne(id: string): Promise<any> {
    try {
      return await this.categoryRepository.delete({ id });
    } catch (error) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
