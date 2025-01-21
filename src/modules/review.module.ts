import { ReviewController } from '@/controllers/review.controller';
import { ReviewService } from '@/services/review.service';
import { Module } from '@nestjs/common';
import { CardModule } from './card.module';
import { DeckModule } from './deck.module';

@Module({
  controllers: [ReviewController],
  imports: [CardModule, DeckModule],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
