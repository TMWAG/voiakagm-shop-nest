import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product/product.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Parameter } from 'src/parameter/parameter.model';

interface CharacteristicCreationAttribute {
  parameterId: number;
  productId: number;
  value: string;
}

@Table({ tableName: 'characteristics', timestamps: false })
export class Characteristic extends Model<
  Characteristic,
  CharacteristicCreationAttribute
> {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: 4,
    description: 'Id параметра',
  })
  @ForeignKey(() => Parameter)
  @Column({ type: DataType.INTEGER, allowNull: false })
  parameterId: number;

  @ApiProperty({
    example: 3,
    description: 'Id товара',
  })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ApiProperty({
    example: '32',
    description: 'Значение характеристики',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @BelongsTo(() => Product)
  product: Product;
}
