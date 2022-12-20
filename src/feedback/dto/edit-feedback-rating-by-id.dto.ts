import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class EditFeedbackRatingByIdDto {
  @ApiProperty({
    example: 23,
    description: 'Id отзыва',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 4,
    enum: [1, 2, 3, 4, 5],
    description: 'Оценка товара',
  })
  @Type(() => Number)
  @Min(1, { message: 'Не может быть меньше 1' })
  @Max(5, { message: 'Не может быть больше 5' })
  @IsInt({ message: 'Должна быть целым числом ' })
  readonly rating: 1 | 2 | 3 | 4 | 5;
}
