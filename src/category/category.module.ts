import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/product/product.model';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    SequelizeModule.forFeature([Category, Product]),
    forwardRef(() => AuthModule),
  ],
})
export class CategoryModule {}
