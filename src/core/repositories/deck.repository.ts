import { Deck } from '@prisma/client';
import {
  DeckWithCategories,
  DeckWithCategoriesPaginationOptions,
} from '@/types/decks/deck.type';
import { Injectable } from '@nestjs/common';
import { orderByOptions, PaginatedResponse } from '@/utils/pagination.util';
import { PrismaService } from '@/services/prisma.service';
import { removeProperties } from '@/utils/object-properties.util';

@Injectable()
export class DeckRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  create({
    title,
    description,
    authorId,
    categories,
  }: Pick<
    DeckWithCategories,
    'title' | 'description' | 'authorId' | 'categories'
  >): Promise<Deck> {
    return this._prismaService.deck.create({
      data: {
        title,
        description,
        authorId,
        deckCategories: {
          createMany: {
            data: categories.map((category) => ({
              categoryId: category.id,
            })),
          },
        },
      },
    });
  }

  async findAllByUser(
    userId: string,
    paginationOptions: DeckWithCategoriesPaginationOptions,
  ): Promise<PaginatedResponse<DeckWithCategories>> {
    console.log(orderByOptions(paginationOptions.orderBy));

    const decks = await this._prismaService.deck.findMany({
      include: {
        deckCategories: {
          include: {
            category: true,
          },
        },
      },
      take: paginationOptions.take,
      skip:
        paginationOptions.page * paginationOptions.take -
        paginationOptions.take,
      orderBy: orderByOptions(paginationOptions.orderBy),
      where: {
        authorId: userId,
      },
    });

    const deckCount = await this._prismaService.deck.count({
      where: { authorId: userId },
    });

    const deckWithCategories: DeckWithCategories[] = decks.map((deck) => ({
      ...removeProperties(deck, ['deckCategories']),
      categories: deck.deckCategories.map(
        (deckCategory) => deckCategory.category,
      ),
    }));

    return new PaginatedResponse(deckWithCategories, {
      page: paginationOptions.page,
      take: paginationOptions.take,
      total: deckCount,
    });
  }

  async findOneByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<DeckWithCategories> {
    const deck = await this._prismaService.deck.findUnique({
      where: { id, authorId: userId },
      include: {
        deckCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!deck) return null;

    return {
      ...removeProperties(deck, ['deckCategories']),
      categories: deck.deckCategories.map(
        (deckCategory) => deckCategory.category,
      ),
    };
  }
}
