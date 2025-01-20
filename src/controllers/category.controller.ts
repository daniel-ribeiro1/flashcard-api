import { Serialize } from '@/decorators/serialize.decorator';
import { CategoryResponseDto } from '@/dtos/categories/category.dto';
import { CreateCategoryBodyDto } from '@/dtos/categories/create-category.dto';
import {
  UpdateCategoryBodyDto,
  UpdateCategoryParamsDto,
} from '@/dtos/categories/update-category.dto';
import { FindCategoryByIdParamsDto } from '@/dtos/categories/find-category-by-id.dto';
import { CategoryService } from '@/services/category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { DeleteCategoryParamsDto } from '@/dtos/categories/delete-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Serialize(CategoryResponseDto)
  @Post()
  create(@Body() body: CreateCategoryBodyDto): Promise<Category> {
    return this._categoryService.create(body);
  }

  @Serialize(CategoryResponseDto)
  @Get()
  findAllByRequester() {
    return this._categoryService.findAllByRequester();
  }

  @Serialize(CategoryResponseDto)
  @Get(':id')
  findById(@Param() params: FindCategoryByIdParamsDto): Promise<Category> {
    return this._categoryService.findById(params.id);
  }

  @Serialize(CategoryResponseDto)
  @Put(':id')
  update(
    @Param() params: UpdateCategoryParamsDto,
    @Body() body: UpdateCategoryBodyDto,
  ): Promise<Category> {
    return this._categoryService.update(params.id, body);
  }

  @Serialize(CategoryResponseDto)
  @Delete(':id')
  delete(@Param() params: DeleteCategoryParamsDto): Promise<Category> {
    return this._categoryService.delete(params.id);
  }
}
