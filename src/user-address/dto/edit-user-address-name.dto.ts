import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class EditUserAddressNameDto {
  @ApiProperty({
    example: 1,
    description: 'Id адреса',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 'Дом',
    description: 'Название адреса',
  })
  @Type(() => String)
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
