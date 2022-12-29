import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteUserAddressDto {
  @ApiProperty({
    example: 1,
    description: 'Id адреса',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
