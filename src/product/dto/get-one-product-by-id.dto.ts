import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetOneProductById {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
  })
  @Type(() => Number)
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
