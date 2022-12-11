import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class EditProductNameDto {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 'Процессор Ryzen 5 5600X',
    description: 'Новое название товара',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
