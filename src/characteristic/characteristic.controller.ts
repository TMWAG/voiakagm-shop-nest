import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Characteristic } from './characteristic.model';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { GetAllCharacteristicByProductId } from './dto/get-all-characteristics-by-product-id.dto';
import { EditCharacteristicParameterIdDto } from './dto/edit-characteristic-parameter-id.dto';
import { EditCharacteristicValueByIdDto } from './dto/edit-characteristic-value-by-id.dto';
import { DeleteCharacteristicByIdDto } from './dto/delete-characteristic-by-id.dto';

@ApiTags('Характеристики')
@Controller('characteristic')
export class CharacteristicController {
  constructor(private characteristicService: CharacteristicService) {}

  @ApiOperation({ summary: 'Добавление характеристики' })
  @ApiResponse({ status: 200, type: Characteristic })
  @Post('/create')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateCharacteristicDto) {
    return this.characteristicService.create(dto);
  }

  @ApiOperation({ summary: 'Все характеристики по Id товара' })
  @ApiResponse({ status: 200, type: [Characteristic] })
  @Get('/:productId')
  getAllByProductId(@Param() dto: GetAllCharacteristicByProductId) {
    return this.characteristicService.getAllByProductId(dto);
  }

  @ApiOperation({ summary: 'Изменение id параметра' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/edit_parameter')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  editParameterId(@Body() dto: EditCharacteristicParameterIdDto) {
    return this.characteristicService.editParameterId(dto);
  }

  @ApiOperation({ summary: 'Изменение значения характеристики' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/edit_value')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  editValueById(@Body() dto: EditCharacteristicValueByIdDto) {
    return this.characteristicService.editValueById(dto);
  }

  @ApiOperation({ summary: 'Удаление характеристики' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  deleteById(@Body() dto: DeleteCharacteristicByIdDto) {
    return this.characteristicService.deleteById(dto);
  }
}
