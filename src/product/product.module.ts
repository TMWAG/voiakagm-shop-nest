import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from 'src/category/category.model';
import { Vendor } from 'src/vendor/vendor.model';
import { ProductController } from './product.controller';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([Product, Vendor, Category]),
    forwardRef(() => AuthModule),
  ],
})
export class ProductModule {}
