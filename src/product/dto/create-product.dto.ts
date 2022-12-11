import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Видеокарта Gigabyte RTX 3070',
    description: 'Название товара',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 1,
    description: 'Id производителя',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly vendorId: number;

  @ApiProperty({
    example: 1,
    description: 'Id категории',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly categoryId: number;

  @ApiProperty({
    example: 41000,
    description: 'Цена товара',
  })
  @IsInt({ message: 'Должно быть целым числом' })
  @IsPositive({ message: 'Не может быть отрицательным' })
  readonly price: number;

  @ApiProperty({
    example: 10,
    description: 'Скидка',
    default: null,
    required: false,
    type: Number,
  })
  @IsOptional()
  @Min(1, { message: 'Не может быть меньше 1' })
  @Max(99, { message: 'Не может быть более 99' })
  @IsInt({ message: 'Должна быть целым числом' })
  readonly discount: number;

  @ApiProperty({
    example:
      'Процессор AMD A6-9400 OEM представляет собой производительное решение начальной серии, которое может стать отличной основой для базовых офисных и домашних систем.',
    description: 'Описание товара',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
