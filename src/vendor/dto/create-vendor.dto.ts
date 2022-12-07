import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({
    example: 'MSI',
    description: 'Название производителя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
