import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateDeckBodyDto } from '@/dtos/decks/create-deck.dto';
import { DeckRepository } from '@/repositories/deck.repository';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { ExceptionMessage } from '@/enum/exceptions-message';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RequestContextKey } from '@/enum/request-context.enum';
import { PaginatedResponse } from '@/utils/pagination.util';
import { RequestException } from '@/exceptions/request.exception';
import { UpdateDeckBodyDto } from '@/dtos/decks/update-deck.dto';
import { RequestContextService } from './request-context.service';
import { DeckWithCategoriesPaginationOptions } from '@/dtos/decks/deck.dto';

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

  async findById(id: string): Promise<DeckWithCategories> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const deck = await this._deckRepository.findByIdAndUserId(id, user.id);

    if (!deck) {
      throw new RequestException(
        ExceptionMessage.DECK_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return deck;
  }

  async update(
    id: string,
    body: UpdateDeckBodyDto,
  ): Promise<DeckWithCategories> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const deck = await this._deckRepository.findByIdAndUserId(id, user.id);

    if (!deck) {
      throw new RequestException(
        ExceptionMessage.DECK_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    let categories: Category[];

    if (body.categoryIds) {
      categories = await this._categoryService.validateAndGetCategoriesIfValid(
        body.categoryIds,
      );
    }

    return this._deckRepository.update(id, {
      title: body.title,
      description: body.description,
      categories,
    });
  }

  async delete(id: string) {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const deck = await this._deckRepository.findByIdAndUserId(id, user.id);

    if (!deck) {
      throw new RequestException(
        ExceptionMessage.DECK_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this._deckRepository.hardDelete(deck.id);
  }
}
