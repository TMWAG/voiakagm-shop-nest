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
import { CreateVendorDto } from './dto/create-vendor.dto';
import { DeleteVendorDto } from './dto/delete-vendor.dto';
import { EditVendorNameDto } from './dto/edit-vendor-name.dto';
import { Vendor } from './vendor.model';
import { VendorService } from './vendor.service';

@ApiTags('Производители')
@Controller('vendor')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @ApiOperation({ summary: 'Добавление нового производителя' })
  @ApiResponse({ status: 200, type: Vendor })
  @Post('/create')
  @Roles('SUPERVISOR', 'ADMIN')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateVendorDto) {
    return this.vendorService.create(dto);
  }

  @ApiOperation({ summary: 'Получение массива всех производителей' })
  @ApiResponse({ status: 200, type: [Vendor] })
  @Get('/all')
  getAll() {
    return this.vendorService.getAll();
  }

  @ApiOperation({ summary: 'Изменение названия производителя' })
  @ApiResponse({ status: 200, type: Boolean })
  @Roles('SUPERVISOR', 'ADMIN')
  @UseGuards(RolesGuard)
  @Put('/edit_name')
  editName(@Body() dto: EditVendorNameDto) {
    return this.vendorService.editName(dto);
  }

  @ApiOperation({ summary: 'Удаление Производителя' })
  @ApiResponse({ status: 200, type: Boolean })
  @Roles('SUPERVISOR', 'ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/delete')
  deleteById(@Body() dto: DeleteVendorDto) {
    return this.vendorService.deleteById(dto);
  }
}
