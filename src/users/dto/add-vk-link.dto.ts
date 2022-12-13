import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class AddVkLinkDto {
  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть числом' })
  readonly id: number;

  @ApiProperty({
    example: 'https://vk.com/miroslavpolitov',
    description: 'Ссылка на профиль ВК',
  })
  @Type(() => String)
  @IsString({ message: 'Должна быть строкой' })
  readonly vkLink: string;
}
