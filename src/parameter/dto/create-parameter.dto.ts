import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateParameterDto {
  @ApiProperty({
    example: 'Тип памяти',
    description: 'Название параметра',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
