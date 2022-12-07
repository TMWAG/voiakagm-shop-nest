import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteVendorDto {
  @ApiProperty({
    example: 1,
    description: 'Числовой идентификатор производителя',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
