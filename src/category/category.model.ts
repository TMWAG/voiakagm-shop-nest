import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CategoryCreationAttribute {
  name: string;
}

@Table({ tableName: 'categories' })
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
}
