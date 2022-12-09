import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDeliveryServiceDto {
  @ApiProperty({
    example: 'СДЭК',
    description: 'Название службы доставки',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
