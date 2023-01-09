import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreatePictureDto {
  @ApiProperty({
    example: 23,
    description: 'Id товара',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly productId: number;
}
