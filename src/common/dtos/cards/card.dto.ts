import { Card } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CardResponseDto
  implements
    Pick<
      Card,
      'id' | 'front' | 'back' | 'revisionDate' | 'createdAt' | 'updatedAt'
    >
{
  @Expose()
  id: string;

  @Expose()
  front: string;

  @Expose()
  back: string;

  @Expose()
  revisionDate: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
