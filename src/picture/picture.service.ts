import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductPicture } from './picture.model';
import { CreatePictureDto } from './dto/create-picture.dto';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(ProductPicture)
    private pictureRepository: typeof ProductPicture,
  ) {}

  async addPictureByProductId(
    dto: CreatePictureDto,
    picture: Express.Multer.File,
  ): Promise<ProductPicture> {
    try {
      const filename = uuid.v4() + '.jpg';
      const filepath = path.resolve(
        __dirname,
        '..',
        'static',
        String(dto.productId),
      );
      try {
        await fs.access(filepath);
      } catch (error) {
        fs.mkdir(filepath, { recursive: true });
      }
      fs.writeFile(path.join(filepath, filename), picture.buffer);
      const productPicture = await this.pictureRepository.create({
        productId: dto.productId,
        filename,
      });
      return productPicture;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
