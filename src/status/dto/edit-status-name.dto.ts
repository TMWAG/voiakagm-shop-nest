import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateStatusDto } from './create-status.dto';

export class EditStatusNameDto extends CreateStatusDto {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @IsInt({ message: 'Должно быть целым числом' })
  readonly id: number;
}
