import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeliveryService } from './delivery-service.model';
import { CreateDeliveryServiceDto } from './dto/create-delivery-service.dto';
import { DeleteDeliveryServiceDto } from './dto/delete-gelivery-service.dto';
import { EditDeliveryServiceNameDto } from './dto/edit-delivery-service-name.dto';

@Injectable()
export class DeliveryServiceService {
  constructor(
    @InjectModel(DeliveryService)
    private deliveryServiceRepository: typeof DeliveryService,
  ) {}

  async crate(dto: CreateDeliveryServiceDto): Promise<DeliveryService> {
    try {
      const deliveryService = await this.deliveryServiceRepository.create({
        name: dto.name,
      });
      return deliveryService;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<DeliveryService[]> {
    try {
      const deliveryServices = await this.deliveryServiceRepository.findAll();
      return deliveryServices;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editName(dto: EditDeliveryServiceNameDto): Promise<boolean> {
    try {
      const deliveryService = await this.deliveryServiceRepository.update(
        { name: dto.name },
        { where: { id: dto.id } },
      );
      return Boolean(deliveryService);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(dto: DeleteDeliveryServiceDto): Promise<boolean> {
    try {
      const deliveryService = await this.deliveryServiceRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(deliveryService);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
