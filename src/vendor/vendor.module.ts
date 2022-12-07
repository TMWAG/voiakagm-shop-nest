import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { VendorController } from './vendor.controller';
import { Vendor } from './vendor.model';
import { VendorService } from './vendor.service';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  imports: [SequelizeModule.forFeature([Vendor]), forwardRef(() => AuthModule)],
})
export class VendorModule {}
