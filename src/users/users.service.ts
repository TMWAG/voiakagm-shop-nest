import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationDto } from 'src/product/dto/pagination.dto';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { AddTgLinkDto } from './dto/add-tg-link.dto';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { AddVkLinkDto } from './dto/add-vk-link.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserByIdDto } from './dto/delete-user-by-id';
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
  async crateUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.roleService.getRoleByName('USER');
      if (role) {
        await user.$set('roles', [role.id]);
        user.roles = [role];
      }
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //get
  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new HttpException(
          UserError.notFound.user.id,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByEmail(dto: LoginUserDto): Promise<User> {
    try {
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByPhone(dto: LoginUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { phone: dto.phone },
        include: {
          model: Role,
          attributes: ['name'],
        },
      });
      if (!user) {
        throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUsers(dto: PaginationDto): Promise<User[]> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 12;
      const offset = page * limit - limit;
      const users = await this.userRepository.findAll({
        attributes: {
          exclude: ['password'],
        },
        include: {
          model: Role,
          attributes: { exclude: ['createdAt'] },
        },
        limit,
        offset,
        order: [['id', 'ASC']],
      });
      return users;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //update
  async addRoleById(dto: AddUserRoleDto): Promise<User> {
    try {
      const user = await this.getUserById(dto.userId);
      const role = await this.roleService.getRoleById(dto.roleId);
      await user.$add('role', role.id);
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addTgLinkById(dto: AddTgLinkDto): Promise<boolean> {
    try {
      const user = await this.userRepository.update(
        { tgLink: dto.tgLink },
        { where: { id: dto.id } },
      );
      return Boolean(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addVkLinkById(dto: AddVkLinkDto): Promise<boolean> {
    try {
      const user = await this.userRepository.update(
        { vkLink: dto.vkLink },
        { where: { id: dto.id } },
      );
      return Boolean(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //delete
  async deleteById(dto: DeleteUserByIdDto): Promise<boolean> {
    try {
      const user = await this.userRepository.destroy({ where: { id: dto.id } });
      return Boolean(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //utility
  async isPhoneUnique(phone: string): Promise<boolean> {
    return !Boolean(await this.userRepository.findOne({ where: { phone } }));
  }

  async isEmailUnique(email: string): Promise<boolean> {
    return !Boolean(await this.userRepository.findOne({ where: { email } }));
  }
}
