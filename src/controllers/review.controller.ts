import { Serialize } from '@/decorators/serialize.decorator';
import { CardResponseDto } from '@/dtos/cards/card.dto';
import { ReviewQueryDto } from '@/dtos/review/review-query.dto';
import { ReviewService } from '@/services/review.service';
import { Controller, Get, Query } from '@nestjs/common';
import { Card } from '@prisma/client';

@Controller('review')
export class ReviewController {
  constructor(private readonly _reviewService: ReviewService) {}

  @Serialize(CardResponseDto)
  @Get()
  findNextCardToReviewIntoDeck(@Query() query: ReviewQueryDto): Promise<Card> {
    return this._reviewService.findNextCardToReviewIntoDeck(query);
  }
}
