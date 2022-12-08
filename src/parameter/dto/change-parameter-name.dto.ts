import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateParameterDto } from './create-parameter.dto';

export class ChangeParameterNameDto extends CreateParameterDto {
  @ApiProperty({
    example: 1,
    description: 'Индекс изменяемого параметра',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
