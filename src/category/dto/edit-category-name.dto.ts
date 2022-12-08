import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class EditCategoryNameDto extends CreateCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
