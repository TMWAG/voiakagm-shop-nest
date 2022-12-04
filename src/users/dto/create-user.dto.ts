import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({
    example: 'Семён',
    description: 'Имя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 'Политов',
    description: 'Фамилия',
  })
  @IsString({ message: 'Должна быть строкой' })
  readonly surname: string;
}
