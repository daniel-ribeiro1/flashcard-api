import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDeckBodyDto } from '@/dtos/decks/create-deck.dto';
import {
  DeckResponseDto,
  DeckWithCategoriesPaginatedResponseDto,
  DeckWithCategoriesPaginationOptions,
} from '@/dtos/decks/deck.dto';
import { DeckService } from '@/services/deck.service';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { PaginatedResponse } from '@/utils/pagination.util';
import { Serialize } from '@/decorators/serialize.decorator';
import { UpdateDeckBodyDto } from '@/dtos/decks/update-deck.dto';
import { UUIDParamDto } from '@/dtos/uuid-param.dto';

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
    @Query() query: DeckWithCategoriesPaginationOptions,
  ): Promise<PaginatedResponse<DeckWithCategories>> {
    return this._deckService.findAll(query);
  }

  @Serialize(DeckResponseDto)
  @Get(':id')
  findById(@Param() params: UUIDParamDto): Promise<DeckWithCategories> {
    return this._deckService.findById(params.id);
  }

  @Serialize(DeckResponseDto)
  @Put(':id')
  update(
    @Param() params: UUIDParamDto,
    @Body() body: UpdateDeckBodyDto,
  ): Promise<DeckWithCategories> {
    return this._deckService.update(params.id, body);
  }

  @Serialize(DeckResponseDto)
  @Delete(':id')
  delete(@Param() params: UUIDParamDto): Promise<DeckWithCategories> {
    return this._deckService.delete(params.id);
  }
}
