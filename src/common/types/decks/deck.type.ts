import { Category, Deck } from '@prisma/client';

export type DeckWithCategories = Deck & {
  categories: Category[];
};
