import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Администратор',
    description: 'Название роли',
  })
  @IsString({ message: 'Должна быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 'Может удалять товары',
    description: 'Описание роли',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
