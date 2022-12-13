import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class AddTgLinkDto {
  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: '@TgUsername',
    description: 'Ник в Telegram',
  })
  @Type(() => String)
  @IsString({ message: 'Должен быть строкой' })
  readonly tgLink: string;
}
