import { CardsPaginationOptions } from '@/dtos/cards/card.dto';
import { PrismaService } from '@/services/prisma.service';
import { PaginatedResponse, paginateQuery } from '@/utils/pagination.util';
import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class CardRepository {
  constructor(private readonly _prisma: PrismaService) {}

  create(
    card: Pick<
      Card,
      'front' | 'back' | 'revisionDate' | 'level' | 'deckId' | 'authorId'
    >,
  ): Promise<Card> {
    return this._prisma.card.create({
      data: card,
    });
  }

  async findAllByDeck(
    deckId: string,
    paginationOptions: CardsPaginationOptions,
  ): Promise<PaginatedResponse<Card>> {
    const cards = await this._prisma.card.findMany({
      ...paginateQuery(paginationOptions),
      where: {
        deckId,
      },
    });

    const total = await this._prisma.card.count({
      where: {
        deckId,
      },
    });

    return new PaginatedResponse(cards, {
      page: paginationOptions.page,
      take: paginationOptions.take,
      total,
    });
  }

  findByIdAndAuthorId(id: string, authorId: string): Promise<Card> {
    return this._prisma.card.findFirst({
      where: {
        id,
        authorId,
      },
    });
  }

  async findByIdAndDeckId(id: string, deckId: string): Promise<Card> {
    return this._prisma.card.findFirst({
      where: {
        id,
        deckId,
      },
    });
  }

  async findNextToReviewIntoDeck(deckId: string): Promise<Card> {
    return this._prisma.card.findFirst({
      where: {
        deckId,
        revisionDate: {
          lte: new Date(),
        },
      },
      orderBy: [{ revisionDate: 'asc' }, { updatedAt: 'asc' }],
    });
  }

  update(
    id: string,
    body: Partial<Pick<Card, 'front' | 'back' | 'revisionDate' | 'level'>>,
  ): Promise<Card> {
    return this._prisma.card.update({
      where: {
        id,
      },
      data: body,
    });
  }

  hardDelete(id: string): Promise<Card> {
    return this._prisma.card.delete({
      where: {
        id,
      },
    });
  }
}
