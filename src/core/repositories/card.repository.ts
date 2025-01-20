import { CardsPaginationOptions } from '@/dtos/cards/card.dto';
import { PrismaService } from '@/services/prisma.service';
import { PaginatedResponse, paginateQuery } from '@/utils/pagination.util';
import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class CardRepository {
  constructor(private readonly _prisma: PrismaService) {}

  create(
    card: Pick<Card, 'front' | 'back' | 'revisionDate' | 'level' | 'deckId'>,
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

  async findByIdAndDeckId(id: string, deckId: string): Promise<Card> {
    return this._prisma.card.findFirst({
      where: {
        id,
        deckId,
      },
    });
  }
}
