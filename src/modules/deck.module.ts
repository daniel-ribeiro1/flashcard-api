import { DeckController } from '@/controllers/deck.controller';
import { DeckRepository } from '@/repositories/deck.repository';
import { DeckService } from '@/services/deck.service';
import { Module } from '@nestjs/common';

import { CategoryModule } from './category.module';

@Module({
  controllers: [DeckController],
  imports: [CategoryModule],
  providers: [DeckRepository, DeckService],
  exports: [DeckRepository, DeckService],
})
export class DeckModule {}
