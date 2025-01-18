import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateDeckBodyDto } from '@/dtos/decks/create-deck.dto';
import {
  DeckResponseDto,
  DeckWithCategoriesPaginatedResponseDto,
  DeckWithCategoriesPaginationOptionsDto,
} from '@/dtos/decks/deck.dto';
import { DeckService } from '@/services/deck.service';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { FindOneDeckByIdParamsDto } from '@/dtos/decks/find-one-deck-by-id.dto';
import { PaginatedResponse } from '@/utils/pagination.util';
import { Serialize } from '@/decorators/serialize.decorator';

@Controller('decks')
export class DeckController {
  constructor(private readonly _deckService: DeckService) {}

  @Serialize(DeckResponseDto)
  @Post()
  create(@Body() body: CreateDeckBodyDto): Promise<DeckWithCategories> {
    return this._deckService.create(body);
  }

  @Serialize(DeckWithCategoriesPaginatedResponseDto)
  @Get()
  findAll(
    @Query() query: DeckWithCategoriesPaginationOptionsDto,
  ): Promise<PaginatedResponse<DeckWithCategories>> {
    return this._deckService.findAll(query);
  }

  @Serialize(DeckResponseDto)
  @Get(':id')
  findOneById(
    @Param() params: FindOneDeckByIdParamsDto,
  ): Promise<DeckWithCategories> {
    return this._deckService.findOneById(params.id);
  }
}
