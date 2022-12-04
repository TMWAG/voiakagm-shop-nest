import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddUserRoleDto {
  @ApiProperty({
    example: '1',
    description: 'id пользователя',
  })
  @IsInt({ message: 'Должно быть целым числом' })
  readonly userId: number;

  @ApiProperty({
    example: '3',
    description: 'id роли',
  })
  @IsInt({ message: 'Должно быть целым числом' })
  readonly roleId: number;
}
