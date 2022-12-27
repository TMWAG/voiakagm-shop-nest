import { Module, forwardRef } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Characteristic } from './characteristic.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CharacteristicController],
  providers: [CharacteristicService],
  imports: [
    SequelizeModule.forFeature([Characteristic]),
    forwardRef(() => AuthModule),
  ],
})
export class CharacteristicModule {}
