import { CategoryController } from '@/controllers/category.controller';
import { CategoryRepository } from '@/repositories/category.repository';
import { CategoryService } from '@/services/category.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
