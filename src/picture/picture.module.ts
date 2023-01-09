import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductPicture } from './picture.model';

@Module({
  controllers: [PictureController],
  providers: [PictureService],
  imports: [SequelizeModule.forFeature([ProductPicture])],
})
export class PictureModule {}
