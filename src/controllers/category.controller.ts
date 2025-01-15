import { Serialize } from '@/decorators/serialize.decorator';
import { CategoryResponseDto } from '@/dtos/category/category.dto';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { CategoryService } from '@/services/category.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Serialize(CategoryResponseDto)
  @Post()
  create(@Body() body: CreateCategoryDto): Promise<Category> {
    return this._categoryService.create(body);
  }
}
