import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserError } from 'src/users/users.errors';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    if (!(await this.userService.isEmailUnique(userDto.email))) {
      throw new HttpException(
        UserError.notUnique.email,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await this.userService.isPhoneUnique(userDto.phone))) {
      throw new HttpException(
        UserError.notUnique.phone,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.crateUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: LoginUserDto) {
    if (userDto.email) {
      const user = await this.userService.getUserByEmail(userDto);
      const passEquals = await bcrypt.compare(userDto.password, user.password);
      if (!passEquals) {
        throw new HttpException(
          UserError.wrong.password,
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    }
    if (userDto.phone) {
      const user = await this.userService.getUserByPhone(userDto);
      if (!user) {
        throw new HttpException(UserError.wrong.prone, HttpStatus.BAD_REQUEST);
      }
      const passEquals = await bcrypt.compare(userDto.password, user.password);
      if (!passEquals) {
        throw new HttpException(
          UserError.wrong.password,
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    }
    throw new HttpException(UserError.noData.empty, HttpStatus.BAD_REQUEST);
  }
}
