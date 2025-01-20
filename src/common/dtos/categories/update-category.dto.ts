import { CreateCategoryBodyDto } from './create-category.dto';
import { FindCategoryByIdParamsDto } from './find-category-by-id.dto';

export class UpdateCategoryParamsDto extends FindCategoryByIdParamsDto {}
export class UpdateCategoryBodyDto extends CreateCategoryBodyDto {}
