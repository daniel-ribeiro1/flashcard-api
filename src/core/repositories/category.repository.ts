import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private readonly _prisma: PrismaService) {}

  create(category: Pick<Category, 'name' | 'authorId'>): Promise<Category> {
    return this._prisma.category.create({
      data: category,
    });
  }

  findAllByDeckId(deckId: string): Promise<Category[]> {
    return this._prisma.category.findMany({
      where: {
        deckCategories: {
          some: {
            deckId,
          },
        },
      },
    });
  }

  findAllByUser(userId: string): Promise<Category[]> {
    return this._prisma.category.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  findOneByIdAndUserId(id: number, userId: string): Promise<Category> {
    return this._prisma.category.findFirst({
      where: {
        id,
        authorId: userId,
      },
    });
  }

  update(id: number, category: Pick<Category, 'name'>): Promise<Category> {
    return this._prisma.category.update({
      data: {
        ...category,
        id,
      },
      where: {
        id,
      },
    });
  }

  hardDelete(id: number): Promise<Category> {
    return this._prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
