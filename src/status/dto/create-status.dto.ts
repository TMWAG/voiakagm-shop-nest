import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({
    example: 'Доставляется',
    description: 'Название статуса заказа',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
