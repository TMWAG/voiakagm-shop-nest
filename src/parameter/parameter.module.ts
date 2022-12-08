import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ParameterController } from './parameter.controller';
import { Parameter } from './parameter.model';
import { ParameterService } from './parameter.service';

@Module({
  controllers: [ParameterController],
  providers: [ParameterService],
  imports: [
    SequelizeModule.forFeature([Parameter]),
    forwardRef(() => AuthModule),
  ],
})
export class ParameterModule {}
