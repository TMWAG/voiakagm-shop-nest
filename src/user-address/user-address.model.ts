import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface UserAddressCreationAttribute {
  userId: number;
  address: string;
  name: string;
}

@Table({ tableName: 'user_addresses', timestamps: false })
export class UserAddress extends Model<
  UserAddress,
  UserAddressCreationAttribute
> {
  @ApiProperty({
    example: 1,
    description: 'Id адреса',
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: 'Офис',
    description: 'Название адреса',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: false })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({
    example: 'Россия, Московская область, Королёв, Трудовая, 12, офис 114',
    description: 'Адрес пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;
}
