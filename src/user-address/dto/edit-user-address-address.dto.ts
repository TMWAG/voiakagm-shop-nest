import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class EditUserAddressAddressDto {
  @ApiProperty({
    example: 1,
    description: 'Id адреса',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 'Россия, Московская область, Королёв, Трудовая, 12, офис 114',
    description: 'Адрес пользователя',
  })
  @Type(() => String)
  @IsString({ message: 'Должен быть строкой' })
  readonly address: string;
}
