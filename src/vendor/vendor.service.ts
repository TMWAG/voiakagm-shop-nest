import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { DeleteVendorDto } from './dto/delete-vendor.dto';
import { EditVendorNameDto } from './dto/edit-vendor-name.dto';
import { Vendor } from './vendor.model';

@Injectable()
export class VendorService {
  constructor(@InjectModel(Vendor) private vendorRepository: typeof Vendor) {}

  async create(dto: CreateVendorDto): Promise<Vendor> {
    try {
      const vendor = await this.vendorRepository.create({ name: dto.name });
      return vendor;
    } catch (e) {
      throw new HttpException(
        'Название производителя должно быть уникальным',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll(): Promise<Vendor[]> {
    try {
      const vendors = await this.vendorRepository.findAll();
      return vendors;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editName(dto: EditVendorNameDto): Promise<boolean> {
    try {
      const vendor = await this.vendorRepository.update(
        { name: dto.name },
        { where: { id: dto.id } },
      );
      return Boolean(vendor);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(dto: DeleteVendorDto): Promise<boolean> {
    try {
      const vendor = await this.vendorRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(vendor);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
