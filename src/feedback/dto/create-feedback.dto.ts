import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 2,
    description: 'Id товара',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly productId: number;

  @ApiProperty({
    example: 'Хорошее что-то',
    description: 'Текст отзыва',
  })
  @Type(() => String)
  @IsString({ message: 'Должно быть строкой' })
  readonly text: string;

  @ApiProperty({
    example: 4,
    enum: [1, 2, 3, 4, 5],
    description: 'Оценка товара',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должна быть целым числом' })
  @Min(1, { message: 'Не может быть меньше 1' })
  @Max(5, { message: 'Не может быть больше 5' })
  readonly rating: 1 | 2 | 3 | 4 | 5;
}
