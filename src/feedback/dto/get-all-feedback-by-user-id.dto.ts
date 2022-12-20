import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetAllFeedbackByUserId {
  @ApiProperty({
    example: 42,
    description: 'Id пользователя',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly userId: number;
}
