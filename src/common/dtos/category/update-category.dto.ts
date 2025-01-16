import { CreateCategoryBodyDto } from './create-category.dto';
import { FindOneCategoryByIdParamsDto } from './find-one-category-by-id.dto';

export class UpdateCategoryParamsDto extends FindOneCategoryByIdParamsDto {}
export class UpdateCategoryBodyDto extends CreateCategoryBodyDto {}
