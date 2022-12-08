import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ParameterCreationAttribute {
  name: string;
}

@Table({ tableName: 'parameters' })
export class Parameter extends Model<Parameter, ParameterCreationAttribute> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный числовой идентификатор',
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'Количество видеопамяти',
    description: 'Название параметра',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
}
