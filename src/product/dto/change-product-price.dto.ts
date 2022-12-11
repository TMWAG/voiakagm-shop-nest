import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ChangeProductPriceDto {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
  })
  @IsInt({ message: 'Должно быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 16000,
    description: 'Новая цена товара',
  })
  @IsInt({ message: 'Должна быть целым числом' })
  readonly price: number;
}
