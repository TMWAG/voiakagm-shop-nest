import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../product/product.model';

interface PictureCreationAttributes {
  productId: number;
  filename: string;
}

@Table({ tableName: 'product_pictures', timestamps: false })
export class ProductPicture extends Model<
  ProductPicture,
  PictureCreationAttributes
> {
  @ApiProperty({
    example: 1,
    description: 'Id картинки',
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({
    example: 23,
    description: 'Id товара',
  })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ApiProperty({
    example: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed.jpg',
    description: 'Название файла',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  filename: string;
}
