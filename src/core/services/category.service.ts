import { CategoryRepository } from '@/repositories/category.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { RequestContextKey } from '@/enum/request-context.enum';
import { CreateCategoryBodyDto } from '@/dtos/categories/create-category.dto';
import { Category } from '@prisma/client';
import { RequestException } from '@/exceptions/request.exception';
import { ExceptionMessage } from '@/enum/exceptions-message';
import { UpdateCategoryBodyDto } from '@/dtos/categories/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryRepository: CategoryRepository,
    private readonly _requestContextService: RequestContextService,
  ) {}

  create(body: CreateCategoryBodyDto): Promise<Category> {
    const user = this._requestContextService.get(RequestContextKey.USER);

    return this._categoryRepository.create({
      name: body.name,
      authorId: user.id,
    });
  }

  findAllByRequester(): Promise<Category[]> {
    const user = this._requestContextService.get(RequestContextKey.USER);

    return this._categoryRepository.findAllByUser(user.id);
  }

  async findOneById(id: number): Promise<Category> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const category = await this._categoryRepository.findOneByIdAndUserId(
      id,
      user.id,
    );

    if (!category) {
      throw new RequestException(
        ExceptionMessage.CATEGORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return category;
  }

  async update(id: number, body: UpdateCategoryBodyDto): Promise<Category> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const category = await this._categoryRepository.findOneByIdAndUserId(
      id,
      user.id,
    );

    if (!category) {
      throw new RequestException(
        ExceptionMessage.CATEGORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this._categoryRepository.update(category.id, body);
  }

  async delete(id: number) {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const category = await this._categoryRepository.findOneByIdAndUserId(
      id,
      user.id,
    );

    if (!category) {
      throw new RequestException(
        ExceptionMessage.CATEGORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this._categoryRepository.hardDelete(category.id);
  }

  async validateAndGetCategoriesIfValid(
    categoryIds: number[],
  ): Promise<Category[]> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const categoryPromises: Promise<Category>[] = [];

    for (const categoryId of categoryIds) {
      categoryPromises.push(
        this._categoryRepository.findOneByIdAndUserId(categoryId, user.id),
      );
    }

    const categories = await Promise.all(categoryPromises);

    if (categories.some((category) => !category)) {
      throw new RequestException(
        ExceptionMessage.CATEGORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return categories;
  }
}
