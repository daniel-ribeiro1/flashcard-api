import { Injectable } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CardRepository } from '@/repositories/card.repository';
import { Card } from '@prisma/client';
import { FindNextCardToReviewQueryDto } from '@/dtos/review/find-next-card-to-review.dto';
import { ReviewCardBodyDto } from '@/dtos/review/review-card.dto';
import { CardService } from './card.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly _cardRepository: CardRepository,
    private readonly _cardService: CardService,
    private readonly _deckService: DeckService,
  ) {}

  async findNextCardToReviewIntoDeck(
    query: FindNextCardToReviewQueryDto,
  ): Promise<Card> {
    await this._deckService.validateAndGetDeckIfValid(query.deckId);

    const card = await this._cardRepository.findNextToReviewIntoDeck(
      query.deckId,
    );

    return card;
  }

  async reviewCard(body: ReviewCardBodyDto): Promise<Card> {
    await this._deckService.validateAndGetDeckIfValid(body.deckId);

    const card = await this._cardService.validateAndGetCardIfValid(body.cardId);

    const nextLevel = this._cardService.getCardLevel(body.isTrue, card);
    const nextRevisionDate = this._cardService.getNextRevisionDate(nextLevel);

    return this._cardRepository.update(card.id, {
      level: nextLevel,
      revisionDate: nextRevisionDate,
    });
  }
}
