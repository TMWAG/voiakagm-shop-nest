import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteParameterDto } from './dto/delete-parameter.dto';
import { ChangeParameterNameDto } from './dto/change-parameter-name.dto';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { Parameter } from './parameter.model';

@Injectable()
export class ParameterService {
  constructor(
    @InjectModel(Parameter) private parameterRepository: typeof Parameter,
  ) {}

  async create(dto: CreateParameterDto): Promise<Parameter> {
    try {
      const parameter = await this.parameterRepository.create({
        name: dto.name,
      });
      return parameter;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Parameter[]> {
    try {
      const parameters = await this.parameterRepository.findAll();
      return parameters;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeNameById(dto: ChangeParameterNameDto): Promise<boolean> {
    try {
      const parameter = await this.parameterRepository.update(
        { name: dto.name },
        { where: { id: dto.id } },
      );
      return Boolean(parameter);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(dto: DeleteParameterDto): Promise<boolean> {
    try {
      const parameter = await this.parameterRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(parameter);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
