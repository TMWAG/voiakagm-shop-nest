import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetAllFeedbackByProductId {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  readonly productId: number;
}
