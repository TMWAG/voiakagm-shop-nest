import { Module } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';

@Module({
  controllers: [CharacteristicController],
  providers: [CharacteristicService]
})
export class CharacteristicModule {}
