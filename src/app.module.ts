import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/feedback.model';
import { ParameterModule } from './parameter/parameter.module';
import { CharacteristicModule } from './characteristic/characteristic.module';
import { OrderedProductModule } from './ordered-product/ordered-product.module';
import { PictureModule } from './picture/picture.module';
import { VendorModule } from './vendor/vendor.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StatusModule } from './status/status.module';
import { DeliveryServiceModule } from './delivery-service/delivery-service.module';
import { OrderModule } from './order/order.module';
import { UserAddressModule } from './user-address/user-address.module';
import { Vendor } from './vendor/vendor.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Feedback, Vendor],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FeedbackModule,
    ParameterModule,
    CharacteristicModule,
    OrderedProductModule,
    PictureModule,
    VendorModule,
    CategoryModule,
    ProductModule,
    StatusModule,
    DeliveryServiceModule,
    OrderModule,
    UserAddressModule,
  ],
})
export class AppModule {}
