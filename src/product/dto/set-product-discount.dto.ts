import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class SetProductDiscountDto {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 15,
    description: 'Скидка',
  })
  @IsInt({ message: 'Должна быть целым числом' })
  readonly discount: number;
}
