import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/category.model';
import { Vendor } from 'src/vendor/vendor.model';

interface ProductCreationAttribute {
  name: string;
  vendorId: number;
  categoryId: number;
  price: number;
  discount: null | number;
  description: string;
}

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model<Product, ProductCreationAttribute> {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'MSI RX 580 8G',
    description: 'Название товара',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 2,
    description: 'Id производителя',
  })
  @ForeignKey(() => Vendor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  vendorId: number;

  @ApiProperty({
    example: 3,
    description: 'Id категории',
  })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @ApiProperty({
    example: 42500,
    description: 'Цена товара',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({
    example: 12,
    description: 'Скидка',
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  discount: null | number;

  @ApiProperty({
    example:
      'Процессор AMD A6-9400 OEM представляет собой производительное решение начальной серии, которое может стать отличной основой для базовых офисных и домашних систем. ',
    description: 'Описание товара',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @BelongsTo(() => Category)
  category: Category;
}
