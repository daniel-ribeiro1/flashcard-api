import { CardController } from '@/controllers/card.controller';
import { CardRepository } from '@/repositories/card.repository';
import { CardService } from '@/services/card.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CardController],
  providers: [CardRepository, CardService],
  exports: [CardRepository, CardService],
})
export class CardModule {}
