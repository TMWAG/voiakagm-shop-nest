import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Feedback } from 'src/feedback/feedback.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttribute {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model<User, UserCreationAttribute> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный числовой идентификатор',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Мирослав',
    description: 'Имя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Громов',
    description: 'Фамилия',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @ApiProperty({
    example: '+79162454156',
    description: 'Контактный телефон',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  phone: string;

  @ApiProperty({
    example: 'uname@mail.ru',
    description: 'Электронная почта',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({
    example: 'MultiPass_1337',
    description: 'Пароль',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'https://vk.com/miroslavpolitov',
    description: 'Ссылка на профиль VK',
  })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  vkLink: string;

  @ApiProperty({
    example: '@VoiakaGM',
    description: 'Имя пользователя в telegram',
  })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  tgLink: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Feedback)
  feedback: Feedback[];
}
