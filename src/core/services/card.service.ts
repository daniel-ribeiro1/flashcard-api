import { CardRepository } from '@/repositories/card.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  constructor(private readonly _cardRepository: CardRepository) {}
}
