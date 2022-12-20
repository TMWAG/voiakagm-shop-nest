import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';
import { User } from 'src/users/users.model';

interface FeedBackCreationAttribute {
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  userId: number;
  productId: number;
}

@Table({ tableName: 'feedback', updatedAt: false })
export class Feedback extends Model<Feedback, FeedBackCreationAttribute> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный числовой идентификатор',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Мои любимые противопехотные мины KCAS',
    description: 'Текст пользовательского отзыва',
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  text: string;

  @ApiProperty({
    enum: [1, 2, 3, 4, 5],
    example: '3',
    description: 'Оценка товара от 1 до 5',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  rating: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;
}
