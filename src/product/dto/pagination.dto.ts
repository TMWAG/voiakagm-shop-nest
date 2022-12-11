import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 1,
    default: 12,
    description: 'Штук на страницу',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  readonly limit: number;

  @ApiProperty({
    example: 2,
    description: 'Номер страницы',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  readonly page: number;
}
