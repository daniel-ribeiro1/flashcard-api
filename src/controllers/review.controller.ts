import { Serialize } from '@/decorators/serialize.decorator';
import { CardResponseDto } from '@/dtos/cards/card.dto';
import { FindNextCardToReviewQueryDto } from '@/dtos/review/find-next-card-to-review.dto';
import { ReviewCardBodyDto } from '@/dtos/review/review-card.dto';
import { ReviewService } from '@/services/review.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Card } from '@prisma/client';

@Controller('review')
export class ReviewController {
  constructor(private readonly _reviewService: ReviewService) {}

  @Serialize(CardResponseDto)
  @Get()
  findNextCardToReviewIntoDeck(
    @Query() query: FindNextCardToReviewQueryDto,
  ): Promise<Card> {
    return this._reviewService.findNextCardToReviewIntoDeck(query);
  }

  @Serialize(CardResponseDto)
  @Post()
  reviewCard(@Body() body: ReviewCardBodyDto): Promise<Card> {
    return this._reviewService.reviewCard(body);
  }
}
