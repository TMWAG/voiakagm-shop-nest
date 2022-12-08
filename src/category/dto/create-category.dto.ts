import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Видеокарты',
    description: 'Название категории',
  })
  @IsString({ message: 'Должен быть строкой' })
  readonly name: string;
}
