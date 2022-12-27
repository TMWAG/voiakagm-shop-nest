import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateCharacteristicDto {
  @ApiProperty({
    example: 23,
    description: 'Id параметра',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly parameterId: number;

  @ApiProperty({
    example: 44,
    description: 'Id товара',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly productId: number;

  @ApiProperty({
    example: '32 Гб',
    description: 'Значение характеристики',
  })
  @Type(() => String)
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;
}
