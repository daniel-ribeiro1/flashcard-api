import { CategoryRepository } from '@/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { RequestContextKey } from '@/enum/request-context.enum';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryRepository: CategoryRepository,
    private readonly _requestContextService: RequestContextService,
  ) {}

  create(category: CreateCategoryDto): Promise<Category> {
    const user = this._requestContextService.get(RequestContextKey.USER);

    return this._categoryRepository.create({
      name: category.name,
      creator_id: user.id,
    });
  }

  findAllByRequester(): Promise<Category[]> {
    const user = this._requestContextService.get(RequestContextKey.USER);

    return this._categoryRepository.findAllByUser(user.id);
  }
}
