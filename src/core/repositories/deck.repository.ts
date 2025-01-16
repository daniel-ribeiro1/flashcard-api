import { PrismaService } from '@/services/prisma.service';
import { DeckWithCategories } from '@/types/decks/deck.type';
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
}
