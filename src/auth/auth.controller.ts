import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация и регистрация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Успешная авторизация, возвращает токен',
  })
  @ApiResponse({
    status: 400,
    description: 'Не верные данные для входа',
  })
  @ApiResponse({
    status: 401,
    description: 'Неверный пароль',
  })
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
