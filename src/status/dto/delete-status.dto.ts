import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteStatusDto {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @IsInt({ message: 'Должно быть целым числом' })
  readonly id: number;
}
