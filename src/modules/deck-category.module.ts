import { DeckCategoryRepository } from '@/repositories/deck-category.repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [DeckCategoryRepository],
  exports: [DeckCategoryRepository],
})
export class DeckCategoryModule {}
