import { Module, forwardRef } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feedback } from './feedback.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [
    SequelizeModule.forFeature([Feedback]),
    forwardRef(() => AuthModule),
  ],
})
export class FeedbackModule {}
