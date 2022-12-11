import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteProductDiscountDto {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
