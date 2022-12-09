import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { DeliveryService } from './delivery-service.model';
import { DeliveryServiceService } from './delivery-service.service';
import { CreateDeliveryServiceDto } from './dto/create-delivery-service.dto';
import { DeleteDeliveryServiceDto } from './dto/delete-gelivery-service.dto';
import { EditDeliveryServiceNameDto } from './dto/edit-delivery-service-name.dto';

@ApiTags('Службы Доставки')
@Controller('delivery_service')
export class DeliveryServiceController {
  constructor(private deliveryServiceService: DeliveryServiceService) {}

  @ApiOperation({ summary: 'Добавление службы доставки' })
  @ApiResponse({ status: 200, type: DeliveryService })
  @Post('/create')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateDeliveryServiceDto) {
    return this.deliveryServiceService.crate(dto);
  }

  @ApiOperation({ summary: 'Получение массива служб доставки' })
  @ApiResponse({ status: 200, type: [DeliveryService] })
  @Get('/all')
  getAll() {
    return this.deliveryServiceService.getAll();
  }

  @ApiOperation({ summary: 'Изменение названия' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/change_name')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  editName(@Body() dto: EditDeliveryServiceNameDto) {
    return this.deliveryServiceService.editName(dto);
  }

  @ApiOperation({ summary: 'Удаление' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  deleteById(@Body() dto: DeleteDeliveryServiceDto) {
    return this.deliveryServiceService.deleteById(dto);
  }
}
