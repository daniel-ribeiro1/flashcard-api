import { CreateDeckBodyDto } from '@/dtos/decks/create-deck.dto';
import { DeckRepository } from '@/repositories/deck.repository';
import { Injectable } from '@nestjs/common';
import { RequestContextKey } from '@/enum/request-context.enum';
import { CategoryService } from './category.service';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { Category } from '@prisma/client';

import { RequestContextService } from './request-context.service';

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

  findAll(): Promise<DeckWithCategories[]> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    return this._deckRepository.findAllByUser(user.id);
  }
}
