import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeckRepository {
  constructor(private readonly _prismaService: PrismaService) {}
}
