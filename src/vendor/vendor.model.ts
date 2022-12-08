import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface VendorCreationAttribute {
  name: string;
}

@Table({ tableName: 'vendors' })
export class Vendor extends Model<Vendor, VendorCreationAttribute> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный числовой идентификатор',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Gigabyte',
    description: 'Название бренда',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;
}
