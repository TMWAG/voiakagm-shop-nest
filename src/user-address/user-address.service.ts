import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserAddress } from './user-address.model';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { JwtService } from '@nestjs/jwt';
import { EditUserAddressAddressDto } from './dto/edit-user-address-address.dto';
import { DeleteUserAddressDto } from './dto/delete-user-address.dto';
import { EditUserAddressNameDto } from './dto/edit-user-address-name.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress) private userAddressRepository: typeof UserAddress,
    private jwtService: JwtService,
  ) {}
  //create
  async create(dto: CreateUserAddressDto, token: string): Promise<UserAddress> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const address = await this.userAddressRepository.create({
        userId,
        name: dto.name,
        address: dto.address,
      });
      return address;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //get
  async getAllByUserId(token: string): Promise<UserAddress[]> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const userAddresses = await this.userAddressRepository.findAll({
        where: { userId: userId },
      });
      return userAddresses;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //edit
  async editUserAddressAddressById(
    dto: EditUserAddressAddressDto,
    token: string,
  ): Promise<boolean> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const targetUserAddress = await this.userAddressRepository.findByPk(
        dto.id,
      );
      if (!targetUserAddress) {
        throw new HttpException('Адрес не не найден', HttpStatus.NOT_FOUND);
      }
      if (targetUserAddress.userId !== userId) {
        throw new HttpException(
          'Данный адрес принадлежит другому пользователю',
          HttpStatus.FORBIDDEN,
        );
      }
      const userAddress = await this.userAddressRepository.update(
        { address: dto.address },
        { where: { id: dto.id } },
      );
      return Boolean(userAddress);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editUserAddressNameById(
    dto: EditUserAddressNameDto,
    token: string,
  ): Promise<boolean> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const targetUserAddress = await this.userAddressRepository.findByPk(
        dto.id,
      );
      if (!targetUserAddress) {
        throw new HttpException('Адрес не не найден', HttpStatus.NOT_FOUND);
      }
      if (targetUserAddress.userId !== userId) {
        throw new HttpException(
          'Данный адрес принадлежит другому пользователю',
          HttpStatus.FORBIDDEN,
        );
      }
      const userAddress = await this.userAddressRepository.update(
        { name: dto.name },
        { where: { id: dto.id } },
      );
      return Boolean(userAddress);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //delete
  async deleteById(dto: DeleteUserAddressDto, token: string): Promise<boolean> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const targetUserAddress = await this.userAddressRepository.findByPk(
        dto.id,
      );
      if (!targetUserAddress) {
        throw new HttpException('Адрес не найден', HttpStatus.NOT_FOUND);
      }
      if (targetUserAddress.userId !== userId) {
        throw new HttpException(
          'Данный адрес принадлежит другому пользователю',
          HttpStatus.FORBIDDEN,
        );
      }
      const userAddress = await this.userAddressRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(userAddress);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
