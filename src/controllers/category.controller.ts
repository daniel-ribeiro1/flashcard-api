import { Serialize } from '@/decorators/serialize.decorator';
import { CategoryResponseDto } from '@/dtos/category/category.dto';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { FindOneCategoryByIdDto } from '@/dtos/category/find-one-category-by-id.dto';
import { CategoryService } from '@/services/category.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Serialize(CategoryResponseDto)
  @Post()
  create(@Body() body: CreateCategoryDto): Promise<Category> {
    return this._categoryService.create(body);
  }

  @Serialize(CategoryResponseDto)
  @Get()
  findAllByRequester() {
    return this._categoryService.findAllByRequester();
  }

  @Serialize(CategoryResponseDto)
  @Get(':id')
  findOneById(@Param() param: FindOneCategoryByIdDto): Promise<Category> {
    return this._categoryService.findOneById(param.id);
  }
}
