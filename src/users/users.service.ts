import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserError } from './users.errors';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  //create
  async crateUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByName('USER');
    if (role) {
      await user.$set('roles', [role.id]);
      user.roles = [role];
    }
    return user;
  }
  //read
  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException(UserError.notFound.user.id, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByEmail(dto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      include: {
        model: Role,
        attributes: ['name'],
      },
    });
    if (!user) {
      throw new HttpException(
        UserError.notFound.user.email,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async getUserByPhone(dto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { phone: dto.phone },
      include: {
        model: Role,
        attributes: ['name'],
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
      include: {
        model: Role,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    });
    return users;
  }
  //update
  async addRoleById(dto: AddUserRoleDto) {
    const user = await this.getUserById(dto.userId);
    const role = await this.roleService.getRoleById(dto.roleId);
    await user.$add('role', role.id);
    return user;
  }
  //delete

  //utility
  async isPhoneUnique(dto: CreateUserDto) {
    return !Boolean(
      await this.userRepository.findOne({ where: { phone: dto.phone } }),
    );
  }

  async isEmailUnique(email: string) {
    return !Boolean(await this.userRepository.findOne({ where: { email } }));
  }
}
