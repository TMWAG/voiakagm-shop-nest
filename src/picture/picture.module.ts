import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductPicture } from './picture.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PictureController],
  providers: [PictureService],
  imports: [SequelizeModule.forFeature([ProductPicture]), AuthModule],
})
export class PictureModule {}
