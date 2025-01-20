import { Category, Deck } from '@prisma/client';
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

  async findById(id: string): Promise<DeckWithCategories> {
    const deck = await this._prismaService.deck.findUnique({
      include: {
        deckCategories: {
          include: {
            category: true,
          },
        },
      },
      where: { id },
    });

    return this._mapDeckWithCategories(deck);
  }

  async findAllByUser(
    userId: string,
    paginationOptions: DeckWithCategoriesPaginationOptions,
  ): Promise<PaginatedResponse<DeckWithCategories>> {
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

    const deckWithCategories: DeckWithCategories[] = decks.map(
      this._mapDeckWithCategories,
    );

    return new PaginatedResponse(deckWithCategories, {
      page: paginationOptions.page,
      take: paginationOptions.take,
      total: deckCount,
    });
  }

  async findByIdAndUserId(
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

    return this._mapDeckWithCategories(deck);
  }

  async update(
    id: string,
    deck: Partial<
      Pick<
        DeckWithCategories,
        'title' | 'description' | 'authorId' | 'categories'
      >
    >,
  ): Promise<DeckWithCategories> {
    await this._prismaService.deck.update({
      where: { id },
      data: {
        title: deck.title,
        description: deck.description,
        deckCategories: {
          deleteMany: !!deck.categories
            ? {
                NOT: {
                  categoryId: {
                    in: (deck.categories || []).map((category) => category.id),
                  },
                },
              }
            : undefined,
          createMany: {
            data: (deck.categories || []).map((category) => ({
              categoryId: category.id,
            })),
            skipDuplicates: true,
          },
        },
      },
    });

    return this.findById(id);
  }

  async hardDelete(id: string): Promise<DeckWithCategories> {
    const deck = await this._prismaService.deck.delete({
      where: { id },
      include: {
        deckCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    return this._mapDeckWithCategories(deck);
  }

  private _mapDeckWithCategories(
    deck: (Deck & { deckCategories: { category: Category }[] }) | null,
  ): DeckWithCategories | null {
    if (!deck) return null;

    return {
      ...removeProperties(deck, ['deckCategories']),
      categories: deck.deckCategories.map(
        (deckCategory) => deckCategory.category,
      ),
    };
  }
}
