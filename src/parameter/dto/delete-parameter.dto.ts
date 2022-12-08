import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteParameterDto {
  @ApiProperty({
    example: 1,
    description: 'Id удаляемого параметра',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  id: number;
}
