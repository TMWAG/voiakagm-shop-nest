import { Module } from '@nestjs/common';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';

@Module({
  controllers: [UserAddressController],
  providers: [UserAddressService]
})
export class UserAddressModule {}
