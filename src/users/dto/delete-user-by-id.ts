import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteUserByIdDto {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  readonly id: number;
}
