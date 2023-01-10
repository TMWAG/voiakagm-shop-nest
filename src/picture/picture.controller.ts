import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductPicture } from './picture.model';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreatePictureDto } from './dto/create-picture.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Картинки')
@Controller('picture')
export class PictureController {
  constructor(private pictureService: PictureService) {}

  @ApiOperation({ summary: 'Добавление картинки продукта' })
  @ApiResponse({ status: 200, type: ProductPicture })
  @Post('/add')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('picture'))
  addPictureByProductId(
    @Body() dto: CreatePictureDto,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    return this.pictureService.addPictureByProductId(dto, picture);
  }
}
