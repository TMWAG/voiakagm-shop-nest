import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ChangeProductVendorDto {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;

  @ApiProperty({
    example: 2,
    description: 'Id производителя',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly vendorId: number;
}
