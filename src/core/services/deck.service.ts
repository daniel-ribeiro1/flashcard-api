import { DeckRepository } from '@/repositories/deck.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeckService {
  constructor(private readonly _deckRepository: DeckRepository) {}
}
