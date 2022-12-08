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
import { ChangeParameterNameDto } from './dto/change-parameter-name.dto';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { DeleteParameterDto } from './dto/delete-parameter.dto';
import { Parameter } from './parameter.model';
import { ParameterService } from './parameter.service';

@Controller('parameter')
export class ParameterController {
  constructor(private parameterService: ParameterService) {}

  @ApiOperation({ summary: 'Создание нового параметра' })
  @ApiResponse({ status: 200, type: Parameter })
  @Post('/create')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateParameterDto) {
    return this.parameterService.create(dto);
  }

  @ApiOperation({ summary: 'Получение массива всех параметров' })
  @ApiResponse({ status: 200, type: [Parameter] })
  @Get('/all')
  getAll() {
    return this.parameterService.getAll();
  }

  @ApiOperation({ summary: 'Изменение названия параметра по Id' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/change_name')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  changeNameById(@Body() dto: ChangeParameterNameDto) {
    return this.parameterService.changeNameById(dto);
  }

  @ApiOperation({ summary: 'Удаление параметра по Id' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  deleteById(@Body() dto: DeleteParameterDto) {
    return this.parameterService.deleteById(dto);
  }
}
