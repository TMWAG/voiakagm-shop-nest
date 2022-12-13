import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

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
  @Min(1, { message: 'Должна быть больше 0' })
  @Max(99, { message: 'не может быть больше 100' })
  readonly discount: number;
}
