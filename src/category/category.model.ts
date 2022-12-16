import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

interface CategoryCreationAttribute {
  name: string;
}

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category, CategoryCreationAttribute> {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Видеокарты',
    description: 'Название категории',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
