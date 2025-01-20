import { PrismaService } from '@/services/prisma.service';
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
}
