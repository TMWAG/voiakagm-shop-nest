import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface StatusCreationAttributes {
  name: string;
}

@Table({ tableName: 'statuses' })
export class Status extends Model<Status, StatusCreationAttributes> {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Ожидает оплаты',
    description: 'Название статуса заказа',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
}
