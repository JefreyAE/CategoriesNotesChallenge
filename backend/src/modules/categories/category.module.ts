import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';
import { CategoryEntity } from 'src/models/category/category.entity';
import { CategoriesService } from 'src/services/categories/categories.service';
import { CategoriesController } from 'src/controllers/categories/categories.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from '../constants';
import { UserEntity } from 'src/models/user/user.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([CategoryEntity, UserEntity]),
    JwtModule.register(jwtOptions),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, EnvironmentConfigService],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
