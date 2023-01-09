import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductPicture } from './picture.model';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(ProductPicture)
    private pictureRepository: typeof ProductPicture,
  ) {}
}
