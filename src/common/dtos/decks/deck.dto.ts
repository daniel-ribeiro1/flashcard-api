import { Deck } from '@prisma/client';
import { Expose } from 'class-transformer';
import { CategoryResponseDto } from '../categories/category.dto';

export class DeckResponseDto
  implements
    Pick<Deck, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
{
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  categories: CategoryResponseDto;
}
