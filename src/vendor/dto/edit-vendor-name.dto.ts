import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateVendorDto } from './create-vendor.dto';

export class EditVendorNameDto extends CreateVendorDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификационный номер для определения редактируемой записи',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
