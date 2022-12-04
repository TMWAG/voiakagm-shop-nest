import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserError } from 'src/users/users.errors';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByName(name: string) {
    const role = await this.roleRepository.findOne({
      where: { name },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return role;
  }

  async getRoleById(id: number) {
    const role = await this.roleRepository.findByPk(id);
    if (!role) {
      throw new HttpException(UserError.notFound.roleId, HttpStatus.NOT_FOUND);
    }
    return role;
  }
}
