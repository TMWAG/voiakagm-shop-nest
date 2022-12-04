import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: '+79154567453',
    description: 'Телефон для логина',
  })
  @ValidateIf(
    (o) =>
      typeof o.email == 'undefined' || (Boolean(o.email) && Boolean(o.phone)),
  )
  @IsPhoneNumber(undefined, { message: 'Должен быть номер телефона' })
  readonly phone: string;

  @ApiProperty({
    example: 'uname@mail.com',
    description: 'Почта для логина',
    required: false,
  })
  @ValidateIf(
    (o) =>
      typeof o.phone == 'undefined' || Boolean(o.email && Boolean(o.phone)),
  )
  @IsEmail({}, { message: 'Должен быть email' })
  readonly email: string;

  @ApiProperty({
    example: 'MultiPass_1337',
    description: 'Пароль',
  })
  @Length(8, 24, { message: 'Должен быть 8-24 символа' })
  @IsString({ message: 'Должен Быть строкой' })
  readonly password: string;
}
