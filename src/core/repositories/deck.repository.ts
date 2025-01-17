import { PrismaService } from '@/services/prisma.service';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { removeProperties } from '@/utils/object-properties.util';
import { Injectable } from '@nestjs/common';
import { Deck } from '@prisma/client';

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

  async findAllByUser(userId: string): Promise<DeckWithCategories[]> {
    const decks = await this._prismaService.deck.findMany({
      include: {
        deckCategories: {
          include: {
            category: true,
          },
        },
      },
      where: {
        authorId: userId,
      },
    });

    return decks.map((deck) => ({
      ...removeProperties(deck, ['deckCategories']),
      categories: deck.deckCategories.map(
        (deckCategory) => deckCategory.category,
      ),
    }));
  }
}
