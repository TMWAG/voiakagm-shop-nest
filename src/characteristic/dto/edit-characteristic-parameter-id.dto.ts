import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class EditCharacteristicParameterIdDto {
  @ApiProperty({
    example: 2,
    description: 'Id характеристики',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 4,
    description: 'Id параметра',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly parameterId: number;
}
