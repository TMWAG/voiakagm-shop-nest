import { Module, forwardRef } from '@nestjs/common';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAddress } from './user-address.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserAddressController],
  providers: [UserAddressService],
  imports: [
    SequelizeModule.forFeature([UserAddress]),
    forwardRef(() => AuthModule),
  ],
})
export class UserAddressModule {}
