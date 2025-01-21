import { ReviewQueryDto } from '@/dtos/review/review-query.dto';
import { Injectable } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CardRepository } from '@/repositories/card.repository';
import { Card } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(
    private readonly _cardRepository: CardRepository,
    private readonly _deckService: DeckService,
  ) {}

  async findNextCardToReviewIntoDeck(query: ReviewQueryDto): Promise<Card> {
    await this._deckService.validateAndGetDeckIfValid(query.deckId);

    const card = await this._cardRepository.findNextToReviewIntoDeck(
      query.deckId,
    );

    return card;
  }
}
