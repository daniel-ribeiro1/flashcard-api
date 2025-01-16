import { DeckController } from '@/controllers/deck.controller';
import { DeckRepository } from '@/repositories/deck.repository';
import { DeckService } from '@/services/deck.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DeckController],
  providers: [DeckRepository, DeckService],
  exports: [DeckRepository, DeckService],
})
export class DeckModule {}
