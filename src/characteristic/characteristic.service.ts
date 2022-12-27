import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Characteristic } from './characteristic.model';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { GetAllCharacteristicByProductId } from './dto/get-all-characteristics-by-product-id.dto';
import { EditCharacteristicParameterIdDto } from './dto/edit-characteristic-parameter-id.dto';
import { EditCharacteristicValueByIdDto } from './dto/edit-characteristic-value-by-id.dto';
import { DeleteCharacteristicByIdDto } from './dto/delete-characteristic-by-id.dto';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectModel(Characteristic)
    private characteristicRepository: typeof Characteristic,
  ) {}
  //create
  async create(dto: CreateCharacteristicDto): Promise<Characteristic> {
    try {
      const characteristic = await this.characteristicRepository.create(dto);
      return characteristic;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //get
  async getAllByProductId(
    dto: GetAllCharacteristicByProductId,
  ): Promise<Characteristic[]> {
    try {
      const characteristics = await this.characteristicRepository.findAll({
        where: { productId: dto.productId },
        order: [['id', 'ASC']],
      });
      return characteristics;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //update
  async editParameterId(
    dto: EditCharacteristicParameterIdDto,
  ): Promise<boolean> {
    try {
      const characteristic = await this.characteristicRepository.update(
        { productId: dto.parameterId },
        { where: { id: dto.id } },
      );
      return Boolean(characteristic);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async editValueById(dto: EditCharacteristicValueByIdDto): Promise<boolean> {
    try {
      const characteristic = await this.characteristicRepository.update(
        { value: dto.value },
        { where: { id: dto.id } },
      );
      return Boolean(characteristic);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //delete
  async deleteById(dto: DeleteCharacteristicByIdDto): Promise<boolean> {
    try {
      const characteristic = await this.characteristicRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(characteristic);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
