import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateDeckBodyDto } from '@/dtos/decks/create-deck.dto';
import { DeckRepository } from '@/repositories/deck.repository';
import {
  DeckWithCategories,
  DeckWithCategoriesPaginationOptions,
} from '@/types/decks/deck.type';
import { ExceptionMessage } from '@/enum/exceptions-message';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginatedResponse } from '@/utils/pagination.util';
import { RequestContextKey } from '@/enum/request-context.enum';
import { RequestContextService } from './request-context.service';
import { RequestException } from '@/exceptions/request.exception';

@Injectable()
export class DeckService {
  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _deckRepository: DeckRepository,
    private readonly _requestContextService: RequestContextService,
  ) {}

  async create(body: CreateDeckBodyDto): Promise<DeckWithCategories> {
    const user = this._requestContextService.get(RequestContextKey.USER);

    let categories: Category[] = [];

    if (body.categoryIds && body.categoryIds.length) {
      categories = await this._categoryService.validateAndGetCategoriesIfValid(
        body.categoryIds,
      );
    }

    const deck = await this._deckRepository.create({
      title: body.title,
      description: body.description,
      authorId: user.id,
      categories,
    });

    return {
      ...deck,
      categories,
    };
  }

  findAll(
    paginationOptions: DeckWithCategoriesPaginationOptions,
  ): Promise<PaginatedResponse<DeckWithCategories>> {
    const user = this._requestContextService.get(RequestContextKey.USER);

    return this._deckRepository.findAllByUser(user.id, paginationOptions);
  }

  async findOneById(id: string): Promise<DeckWithCategories> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const deck = await this._deckRepository.findOneByIdAndUserId(id, user.id);

    if (!deck) {
      throw new RequestException(
        ExceptionMessage.DECK_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return deck;
  }
}
