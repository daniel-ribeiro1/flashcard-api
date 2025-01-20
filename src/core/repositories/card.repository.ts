import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardRepository {
  constructor(private readonly _prisma: PrismaService) {}
}
