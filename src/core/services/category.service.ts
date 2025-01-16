import { CategoryRepository } from '@/repositories/category.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { RequestContextKey } from '@/enum/request-context.enum';
import { CreateCategoryBodyDto } from '@/dtos/category/create-category.dto';
import { Category } from '@prisma/client';
import { RequestException } from '@/exceptions/request.exception';
import { ExceptionMessage } from '@/enum/exceptions-message';
import { UpdateCategoryBodyDto } from '@/dtos/category/update-category.dto';
import { DeckCategoryRepository } from '@/repositories/deck-category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryRepository: CategoryRepository,
    private readonly _deckCategoryRepository: DeckCategoryRepository,
    private readonly _requestContextService: RequestContextService,
  ) {}

  create(category: CreateCategoryBodyDto): Promise<Category> {
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

    await this._deckCategoryRepository.hardDeleteManyByCategoryId(category.id);

    return this._categoryRepository.hardDelete(category.id);
  }
}
