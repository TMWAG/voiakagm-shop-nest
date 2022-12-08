import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { StatusController } from './status.controller';
import { Status } from './status.model';
import { StatusService } from './status.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [SequelizeModule.forFeature([Status]), forwardRef(() => AuthModule)],
})
export class StatusModule {}
