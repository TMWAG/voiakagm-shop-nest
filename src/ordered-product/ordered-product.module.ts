import { Module } from '@nestjs/common';
import { OrderedProductController } from './ordered-product.controller';
import { OrderedProductService } from './ordered-product.service';

@Module({
  controllers: [OrderedProductController],
  providers: [OrderedProductService]
})
export class OrderedProductModule {}
