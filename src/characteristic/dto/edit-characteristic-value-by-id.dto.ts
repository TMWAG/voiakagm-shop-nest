import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class EditCharacteristicValueByIdDto {
  @ApiProperty({
    example: 23,
    description: 'Id характеристики',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: '64 Гб',
    description: 'Значение характеристики',
  })
  @Type(() => String)
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;
}
