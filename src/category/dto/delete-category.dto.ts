import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
