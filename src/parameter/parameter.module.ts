import { Module } from '@nestjs/common';
import { ParameterController } from './parameter.controller';
import { ParameterService } from './parameter.service';

@Module({
  controllers: [ParameterController],
  providers: [ParameterService]
})
export class ParameterModule {}
