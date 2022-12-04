import { Module } from '@nestjs/common';
import { DeliveryServiceController } from './delivery-service.controller';
import { DeliveryServiceService } from './delivery-service.service';

@Module({
  controllers: [DeliveryServiceController],
  providers: [DeliveryServiceService]
})
export class DeliveryServiceModule {}
