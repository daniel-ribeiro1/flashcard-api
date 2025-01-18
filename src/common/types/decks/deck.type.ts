import { Category, Deck } from '@prisma/client';
import { PaginationOptions } from '../pagination.type';

export type DeckWithCategories = Deck & {
  categories: Category[];
};

export type DeckWithCategoriesPaginationOptions = PaginationOptions<
  Pick<DeckWithCategories, 'title' | 'createdAt' | 'updatedAt'>
>;
