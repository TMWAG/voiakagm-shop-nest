import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttribute {
  name: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttribute> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Модератор',
    description: 'Название роли',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Может изменять описания товаров',
    description: 'Описание роли',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
