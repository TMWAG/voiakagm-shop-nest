import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DeliveryServiceCreationAttribute {
  name: string;
}

@Table({ tableName: 'delivery_services' })
export class DeliveryService extends Model<
  DeliveryService,
  DeliveryServiceCreationAttribute
> {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Почта России',
    description: 'Название сервиса доставки',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
}
