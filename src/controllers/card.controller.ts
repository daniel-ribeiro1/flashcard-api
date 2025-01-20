import { Serialize } from '@/decorators/serialize.decorator';
import { CardResponseDto } from '@/dtos/cards/card.dto';
import { CreateCardBodyDto } from '@/dtos/cards/create-card.dto';
import { CardService } from '@/services/card.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Card } from '@prisma/client';

@Controller('cards')
export class CardController {
  constructor(private readonly _cardService: CardService) {}

  @Serialize(CardResponseDto)
  @Post()
  create(@Body() body: CreateCardBodyDto): Promise<Card> {
    return this._cardService.create(body);
  }
}
