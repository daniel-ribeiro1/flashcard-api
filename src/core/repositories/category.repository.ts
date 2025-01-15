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
}
