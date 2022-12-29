import { Module } from '@nestjs/common';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAddress } from './user-address.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserAddressController],
  providers: [UserAddressService],
  imports: [SequelizeModule.forFeature([UserAddress]), JwtModule],
})
export class UserAddressModule {}
