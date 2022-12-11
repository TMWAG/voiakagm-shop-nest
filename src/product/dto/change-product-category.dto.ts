import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ChangeProductCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 2,
    description: 'Id категории',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly categoryId: number;
}
