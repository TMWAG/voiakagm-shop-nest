import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetAllProductsByCategoryIdDto {
  @ApiProperty({
    example: 3,
    description: 'Id категории',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly categoryId: number;
}
