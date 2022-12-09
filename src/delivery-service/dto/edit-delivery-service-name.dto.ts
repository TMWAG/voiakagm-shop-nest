import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateDeliveryServiceDto } from './create-delivery-service.dto';

export class EditDeliveryServiceNameDto extends CreateDeliveryServiceDto {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @IsInt({ message: 'Должен быть целым числом' })
  readonly id: number;
}
