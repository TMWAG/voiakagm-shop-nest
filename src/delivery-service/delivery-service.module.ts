import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { DeliveryServiceController } from './delivery-service.controller';
import { DeliveryService } from './delivery-service.model';
import { DeliveryServiceService } from './delivery-service.service';

@Module({
  controllers: [DeliveryServiceController],
  providers: [DeliveryServiceService],
  imports: [
    SequelizeModule.forFeature([DeliveryService]),
    forwardRef(() => AuthModule),
  ],
})
export class DeliveryServiceModule {}
