import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetAllCharacteristicByProductId {
  @ApiProperty({
    example: 2,
    description: 'Id товара',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly productId: number;
}
