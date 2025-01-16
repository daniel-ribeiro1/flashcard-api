import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeckCategoryRepository {
  constructor(private readonly _prisma: PrismaService) {}

  /**
   *
   * @param {number} categoryId
   *
   * @description Remove todas as relações existentes entre a tabela
   * Deck e a tabela Category utilizando como filtro o id da categoria.
   *
   * @returns {Promise<Prisma.BatchPayload>}
   */
  hardDeleteManyByCategoryId(categoryId: number): Promise<Prisma.BatchPayload> {
    return this._prisma.deckCategory.deleteMany({
      where: {
        categoryId,
      },
    });
  }
}
