import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feedback } from './feedback.model';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { GetAllFeedbackByProductId } from './dto/get-all-feedback-by-product-id.dto';
import { GetAllFeedbackByUserId } from './dto/get-all-feedback-by-user-id.dto';
import { EditFeedbackTextByIdDto } from './dto/edit-feedback-text-by-id.dto';
import { EditFeedbackRatingByIdDto } from './dto/edit-feedback-rating-by-id.dto';
import { DeleteFeedbackByIdDto } from './dto/delete-feedback-by-id.dto';
import { PaginationDto } from 'src/product/dto/pagination.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback) private feedbackRepository: typeof Feedback,
    private jwtService: JwtService,
  ) {}

  //create
  async create(dto: CreateFeedbackDto, token: string): Promise<Feedback> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const feedback = await this.feedbackRepository.create({
        userId,
        ...dto,
      });
      return feedback;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //get
  async getAllByProductId(
    dto: GetAllFeedbackByProductId,
    pageDto: PaginationDto,
  ): Promise<{ rows: Feedback[]; count: number }> {
    try {
      const page = pageDto.page || 1;
      const limit = pageDto.limit || 12;
      const offset = page * limit - limit;
      const feedbacks = await this.feedbackRepository.findAndCountAll({
        where: { productId: dto.productId },
        order: [['createdAt', 'ASC']],
        limit,
        offset,
      });
      return feedbacks;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllByUserId(
    dto: GetAllFeedbackByUserId,
    pageDto: PaginationDto,
  ): Promise<{ rows: Feedback[]; count: number }> {
    try {
      const page = pageDto.page || 1;
      const limit = pageDto.limit || 12;
      const offset = page * limit - limit;
      const feedbacks = await this.feedbackRepository.findAndCountAll({
        where: { userId: dto.userId },
        order: [['createdAt', 'ASC']],
        limit,
        offset,
      });
      return feedbacks;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //edit
  async editTextById(
    dto: EditFeedbackTextByIdDto,
    token: string,
  ): Promise<boolean> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const targetFeedback = await this.feedbackRepository.findOne({
        where: { id: dto.id },
      });
      if (!targetFeedback) {
        throw new HttpException('Отзыв не найден', HttpStatus.NOT_FOUND);
      }
      if (targetFeedback.userId !== userId) {
        throw new HttpException(
          'Изменить отзыв может только автор',
          HttpStatus.FORBIDDEN,
        );
      }
      const feedback = await this.feedbackRepository.update(
        { text: dto.text },
        { where: { id: dto.id } },
      );
      return Boolean(feedback);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async editRatingById(
    dto: EditFeedbackRatingByIdDto,
    token: string,
  ): Promise<boolean> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const targetFeedback = await this.feedbackRepository.findOne({
        where: { id: dto.id },
      });
      if (!targetFeedback) {
        throw new HttpException('Отзыв не найден', HttpStatus.NOT_FOUND);
      }
      if (targetFeedback.userId !== userId) {
        throw new HttpException(
          'Отзыв может изменить только автор',
          HttpStatus.FORBIDDEN,
        );
      }
      const feedback = await this.feedbackRepository.update(
        { rating: dto.rating },
        { where: { id: dto.id } },
      );
      return Boolean(feedback);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //delete
  async deleteById(
    dto: DeleteFeedbackByIdDto,
    token: string,
  ): Promise<boolean> {
    try {
      const decryptedToken = this.jwtService.decode(token.split(' ')[1]);
      if (!decryptedToken) {
        throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
      }
      const userId = Number(Object.values(decryptedToken)[1]);
      const targetFeedback = await this.feedbackRepository.findOne({
        where: { id: dto.id },
      });
      if (!targetFeedback) {
        throw new HttpException('Отзыв не найден', HttpStatus.NOT_FOUND);
      }
      if (targetFeedback.userId !== userId) {
        throw new HttpException(
          'Отзыв может удалить только автор',
          HttpStatus.FORBIDDEN,
        );
      }
      const feedback = await this.feedbackRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(feedback);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
