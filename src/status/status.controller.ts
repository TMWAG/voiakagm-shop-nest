import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateStatusDto } from './dto/create-status.dto';
import { DeleteStatusDto } from './dto/delete-status.dto';
import { EditStatusNameDto } from './dto/edit-status-name.dto';
import { Status } from './status.model';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @ApiOperation({ summary: 'Добавление нового статуса заказа' })
  @ApiResponse({ status: 200, type: Status })
  @Post('/create')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateStatusDto) {
    return this.statusService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех статусов' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get('/all')
  getAll() {
    return this.statusService.getAll();
  }

  @ApiOperation({ summary: 'Изменение названия статуса' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/change_name')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  editName(@Body() dto: EditStatusNameDto) {
    return this.statusService.editName(dto);
  }

  @ApiOperation({ summary: 'Удаление статуса по id' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  deleteById(@Body() dto: DeleteStatusDto) {
    return this.statusService.deleteById(dto);
  }
}
