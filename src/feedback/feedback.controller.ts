import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Feedback } from './feedback.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { GetAllFeedbackByProductId } from './dto/get-all-feedback-by-product-id.dto';
import { PaginationDto } from 'src/product/dto/pagination.dto';
import { GetAllFeedbackByUserId } from './dto/get-all-feedback-by-user-id.dto';
import { EditFeedbackTextByIdDto } from './dto/edit-feedback-text-by-id.dto';
import { EditFeedbackRatingByIdDto } from './dto/edit-feedback-rating-by-id.dto';
import { DeleteFeedbackByIdDto } from './dto/delete-feedback-by-id.dto';

@ApiTags('Отзывы')
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiResponse({ status: 200, type: Feedback })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateFeedbackDto,
    @Headers('Authorization') token: string,
  ) {
    return this.feedbackService.create(dto, token);
  }

  @ApiOperation({ summary: 'Все отзывы товара' })
  @ApiResponse({ status: 200, type: [Feedback] })
  @Get('/product/:productId')
  getAllByProductId(
    @Param() dto: GetAllFeedbackByProductId,
    @Query() pageDto: PaginationDto,
  ) {
    return this.feedbackService.getAllByProductId(dto, pageDto);
  }

  @ApiOperation({ summary: 'Все отзывы пользователя' })
  @ApiResponse({ status: 200, type: [Feedback] })
  @Get('/user/:userId')
  getAllByUserId(
    @Param() dto: GetAllFeedbackByUserId,
    @Query() pageDto: PaginationDto,
  ) {
    return this.feedbackService.getAllByUserId(dto, pageDto);
  }

  @ApiOperation({ summary: 'Изменение текста по Id' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/edit_text')
  @UseGuards(JwtAuthGuard)
  editTextById(
    @Body() dto: EditFeedbackTextByIdDto,
    @Headers('Authorization') token: string,
  ) {
    return this.feedbackService.editTextById(dto, token);
  }

  @ApiOperation({ summary: 'Изменение оценки по Id' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/edit_rating')
  @UseGuards(JwtAuthGuard)
  editRatingById(
    @Body() dto: EditFeedbackRatingByIdDto,
    @Headers('Authorization') token: string,
  ) {
    return this.feedbackService.editRatingById(dto, token);
  }

  @ApiOperation({ summary: 'Удаление отзыва по id' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  deleteById(
    @Body() dto: DeleteFeedbackByIdDto,
    @Headers('Authorization') token: string,
  ) {
    return this.feedbackService.deleteById(dto, token);
  }
}
