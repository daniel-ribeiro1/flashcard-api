import { LEVEL_MAPPER } from '@/constants/card-level.constant';
import { CreateCardBodyDto } from '@/dtos/cards/create-card.dto';
import { CardRepository } from '@/repositories/card.repository';
import { DeckRepository } from '@/repositories/deck.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Card, Deck } from '@prisma/client';
import { addDays } from 'date-fns';
import { RequestContextService } from './request-context.service';
import { RequestException } from '@/exceptions/request.exception';
import { ExceptionMessage } from '@/enum/exceptions-message';
import { PaginatedResponse } from '@/utils/pagination.util';
import { FindAllCardsQueryDto } from '@/dtos/cards/find-all-cards.dto';
import { FindCardByIdQueryDto } from '@/dtos/cards/find-card-by-id.dto';
import { UpdateCardBodyDto } from '@/dtos/cards/update-card.dto';
import { DeckService } from './deck.service';
import { RequestContextKey } from '@/enum/request-context.enum';

@Injectable()
export class CardService {
  constructor(
    private readonly _cardRepository: CardRepository,
    private readonly _deckRepository: DeckRepository,
    private readonly _deckService: DeckService,
    private readonly _requestContextService: RequestContextService,
  ) {}

  async create(body: CreateCardBodyDto): Promise<Card> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    await this._deckService.validateAndGetDeckIfValid(body.deckId);

    const level = this._getCardLevel();
    const revisionDate = this._getNextRevisionDate(level);

    return this._cardRepository.create({
      ...body,
      level,
      revisionDate,
      authorId: user.id,
    });
  }

  async findAll({
    deckId,
    ...paginationOptions
  }: FindAllCardsQueryDto): Promise<PaginatedResponse<Card>> {
    await this._deckService.validateAndGetDeckIfValid(deckId);

    return this._cardRepository.findAllByDeck(deckId, paginationOptions);
  }

  async findById(id: string, query: FindCardByIdQueryDto): Promise<Card> {
    const deck = await this._deckService.validateAndGetDeckIfValid(
      query.deckId,
    );

    return this.validateAndGetCardIfValid(id, deck);
  }

  async update(id: string, body: UpdateCardBodyDto): Promise<Card> {
    const deck = await this._deckService.validateAndGetDeckIfValid(body.deckId);
    const card = await this.validateAndGetCardIfValid(id, deck);

    return this._cardRepository.update(card.id, body);
  }

  async delete(id: string): Promise<Card> {
    const user = this._requestContextService.get(RequestContextKey.USER);
    const card = await this._cardRepository.findByIdAndAuthorId(id, user.id);

    if (!card) {
      throw new RequestException(
        ExceptionMessage.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this._cardRepository.hardDelete(id);
  }

  async validateAndGetCardIfValid(id: string, deck: Deck): Promise<Card> {
    const card = await this._cardRepository.findByIdAndDeckId(id, deck.id);

    if (!card) {
      throw new RequestException(
        ExceptionMessage.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return card;
  }

  /**
   *  @param {boolean|undefined} nextLevel - Ir para o próximo nível?
   *  @param {Card|undefined} card - Card
   *
   *  @description
   *   Existem 5 níveis para os cards:
   *    - 1 -> Próxima revisão em 1 dia
   *    - 2 -> Próxima revisão em 3 dias
   *    - 3 -> Próxima revisão em 7 dias
   *    - 4 -> Próxima revisão em 15 dias
   *    - 5 -> Próxima revisão em 30 dias
   *
   *  @returns {number} - Nível do card
   */
  private _getCardLevel(nextLevel?: boolean, card?: Card) {
    if (!card) return 1;

    if (!nextLevel) {
      return card.level > 1 ? card.level - 1 : 1;
    }

    return card.level < 5 ? card.level + 1 : 5;
  }

  /**
   *  @param {number} level - Ir para o próximo nível?
   *
   *  @description
   *   Existem 5 níveis para os cards:
   *    - 1 -> Próxima revisão em 1 dia
   *    - 2 -> Próxima revisão em 3 dias
   *    - 3 -> Próxima revisão em 7 dias
   *    - 4 -> Próxima revisão em 15 dias
   *    - 5 -> Próxima revisão em 30 dias
   *
   *  @returns {Date} - Próxima data de revisão
   */
  private _getNextRevisionDate(level: number): Date {
    const today = new Date();
    const daysToAdd = LEVEL_MAPPER[level - 1];

    let revisionDate: Date;

    if (!daysToAdd) {
      revisionDate = addDays(today, 1);
    } else {
      revisionDate = addDays(today, daysToAdd);
    }

    revisionDate.setHours(23, 59, 59, 999);

    return revisionDate;
  }
}
