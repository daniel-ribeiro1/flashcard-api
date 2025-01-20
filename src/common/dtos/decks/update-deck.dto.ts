import { CreateDeckBodyDto } from './create-deck.dto';
import { FindDeckByIdParamsDto } from './find-deck-by-id.dto';

export class UpdateDeckParamsDto extends FindDeckByIdParamsDto {}
export class UpdateDeckBodyDto extends CreateDeckBodyDto {}
