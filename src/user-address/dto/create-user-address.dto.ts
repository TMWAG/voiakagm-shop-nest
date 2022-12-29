import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserAddressDto {
  @ApiProperty({
    example: 'Офис',
    description: 'Название адреса',
  })
  @Type(() => String)
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 'Россия, Московская область, Королёв, Трудовая, 12, офис 114',
    description: 'Адрес пользователя',
  })
  @Type(() => String)
  @IsString({ message: 'Должен быть строкой' })
  readonly address: string;
}
