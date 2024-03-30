import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ConflictException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/categories/createCategory.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateCategoryResponse } from 'src/responses/categories/createCategory.response';
import { FindAllCategoriesResponse } from 'src/responses/categories/findAllCategories.response';
import { CategoriesService } from 'src/services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createOne(
    @Body() body: CreateCategoryDto,
    @Req() req,
  ): Promise<CreateCategoryResponse> {
    try {
      const userId = req.user.sub;
      return await this.categoriesService.createOne(body, userId);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          'Category with this name already exists',
          HttpStatus.CONFLICT,
        );
      }

      console.error('Error creating the category:', error);
      throw new HttpException(
        'Error creating the category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('listAll')
  @UseGuards(AuthGuard)
  async findAll(@Req() req): Promise<FindAllCategoriesResponse[]> {
    const userId = req.user.sub;
    return await this.categoriesService.findAll(userId);
  }
}
