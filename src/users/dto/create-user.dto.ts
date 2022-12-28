import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({
    example: '+79154567453',
    description: 'Телефон для логина',
  })
  @IsPhoneNumber(undefined, { message: 'Должен быть номер телефона' })
  readonly phone: string;

  @ApiProperty({
    example: 'uname@mail.com',
    description: 'Почта для логина',
    required: false,
  })
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
