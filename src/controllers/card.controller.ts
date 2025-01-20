import { Serialize } from '@/decorators/serialize.decorator';
import {
  CardResponseDto,
  CardsPaginatedResponseDto,
} from '@/dtos/cards/card.dto';
import { CreateCardBodyDto } from '@/dtos/cards/create-card.dto';
import { FindAllCardsQueryDto } from '@/dtos/cards/find-all-cards.dto';
import { FindCardByIdQueryDto } from '@/dtos/cards/find-card-by-id.dto';
import { UUIDParamDto } from '@/dtos/uuid-param.dto';
import { CardService } from '@/services/card.service';
import { PaginatedResponse } from '@/utils/pagination.util';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Card } from '@prisma/client';

@Controller('cards')
export class CardController {
  constructor(private readonly _cardService: CardService) {}

  @Serialize(CardResponseDto)
  @Post()
  create(@Body() body: CreateCardBodyDto): Promise<Card> {
    return this._cardService.create(body);
  }

  @Serialize(CardsPaginatedResponseDto)
  @Get()
  findAll(
    @Query() query: FindAllCardsQueryDto,
  ): Promise<PaginatedResponse<Card>> {
    return this._cardService.findAll(query);
  }

  @Serialize(CardResponseDto)
  @Get(':id')
  findById(
    @Param() params: UUIDParamDto,
    @Query() query: FindCardByIdQueryDto,
  ): Promise<Card> {
    return this._cardService.findById(params.id, query);
  }
}
