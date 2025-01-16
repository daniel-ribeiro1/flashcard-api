import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private readonly _prisma: PrismaService) {}

  create(category: Pick<Category, 'name' | 'creator_id'>): Promise<Category> {
    return this._prisma.category.create({
      data: category,
    });
  }

  findAllByUser(userId: string): Promise<Category[]> {
    return this._prisma.category.findMany({
      where: {
        creator_id: userId,
      },
    });
  }

  findOneByIdAndUserId(id: number, userId: string): Promise<Category> {
    return this._prisma.category.findFirst({
      where: {
        id,
        creator_id: userId,
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
}
