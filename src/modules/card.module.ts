import { CardController } from '@/controllers/card.controller';
import { CardRepository } from '@/repositories/card.repository';
import { CardService } from '@/services/card.service';
import { Module } from '@nestjs/common';
import { DeckModule } from './deck.module';

@Module({
  controllers: [CardController],
  imports: [DeckModule],
  providers: [CardRepository, CardService],
  exports: [CardRepository, CardService],
})
export class CardModule {}
