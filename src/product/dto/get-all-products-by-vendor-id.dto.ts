import { ApiProperty } from '@nestjs/swagger';

export class GetAllProductsByVendorIdDto {
  @ApiProperty({
    example: 2,
    description: 'Id производителя',
  })
  readonly vendorId: number;
}
