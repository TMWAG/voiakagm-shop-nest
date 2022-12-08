import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { DeleteStatusDto } from './dto/delete-status.dto';
import { EditStatusNameDto } from './dto/edit-status-name.dto';
import { Status } from './status.model';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusRepository: typeof Status) {}

  async create(dto: CreateStatusDto): Promise<Status> {
    try {
      const status = await this.statusRepository.create({ name: dto.name });
      return status;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Status[]> {
    try {
      const statuses = await this.statusRepository.findAll();
      return statuses;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editName(dto: EditStatusNameDto): Promise<boolean> {
    try {
      const status = await this.statusRepository.update(
        { name: dto.name },
        { where: { id: dto.id } },
      );
      return Boolean(status);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(dto: DeleteStatusDto): Promise<boolean> {
    try {
      const status = await this.statusRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(status);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
