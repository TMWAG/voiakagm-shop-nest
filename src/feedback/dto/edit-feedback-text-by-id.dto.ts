import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class EditFeedbackTextByIdDto {
  @ApiProperty({
    example: 23,
    description: 'Id отзыва',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 'Денег не стоит',
    description: 'Текст отзыва',
  })
  @Type(() => String)
  @IsString({ message: 'Должен быть строкой' })
  readonly text: string;
}
