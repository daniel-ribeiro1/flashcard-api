import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateDeckBodyDto } from '@/dtos/decks/create-deck.dto';
import {
  DeckResponseDto,
  DeckWithCategoriesPaginatedResponseDto,
  DeckWithCategoriesPaginationOptionsDto,
} from '@/dtos/decks/deck.dto';
import { DeckService } from '@/services/deck.service';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { FindDeckByIdParamsDto } from '@/dtos/decks/find-deck-by-id.dto';
import { PaginatedResponse } from '@/utils/pagination.util';
import { Serialize } from '@/decorators/serialize.decorator';
import {
  UpdateDeckBodyDto,
  UpdateDeckParamsDto,
} from '@/dtos/decks/update-deck.dto';

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
  findById(
    @Param() params: FindDeckByIdParamsDto,
  ): Promise<DeckWithCategories> {
    return this._deckService.findById(params.id);
  }

  @Serialize(DeckResponseDto)
  @Put(':id')
  update(
    @Param() params: UpdateDeckParamsDto,
    @Body() body: UpdateDeckBodyDto,
  ): Promise<DeckWithCategories> {
    return this._deckService.update(params.id, body);
  }
}
