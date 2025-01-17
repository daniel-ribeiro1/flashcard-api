import { Serialize } from '@/decorators/serialize.decorator';
import { CreateDeckBodyDto } from '@/dtos/decks/create-deck.dto';
import { DeckResponseDto } from '@/dtos/decks/deck.dto';
import { DeckService } from '@/services/deck.service';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('decks')
export class DeckController {
  constructor(private readonly _deckService: DeckService) {}

  @Serialize(DeckResponseDto)
  @Post()
  create(@Body() body: CreateDeckBodyDto): Promise<DeckWithCategories> {
    return this._deckService.create(body);
  }

  @Serialize(DeckResponseDto)
  @Get()
  findAll(): Promise<DeckWithCategories[]> {
    return this._deckService.findAll();
  }
}
