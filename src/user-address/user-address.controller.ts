import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAddress } from './user-address.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { EditUserAddressAddressDto } from './dto/edit-user-address-address.dto';
import { DeleteUserAddressDto } from './dto/delete-user-address.dto';
import { EditUserAddressNameDto } from './dto/edit-user-address-name.dto';

@ApiTags('Адреса пользователей')
@Controller('user_address')
export class UserAddressController {
  constructor(private useAddressService: UserAddressService) {}

  @ApiOperation({ summary: 'Добавление нового адреса' })
  @ApiResponse({ status: 200, type: UserAddress })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateUserAddressDto,
    @Headers('Authorization') token: string,
  ) {
    return this.useAddressService.create(dto, token);
  }

  @ApiOperation({ summary: 'Получение массива адресов пользователя' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  @Get('/all')
  @UseGuards(JwtAuthGuard)
  getAllByUserId(@Headers('Authorization') token: string) {
    return this.useAddressService.getAllByUserId(token);
  }

  @ApiOperation({ summary: 'Изменение адреса' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/edit_address')
  @UseGuards(JwtAuthGuard)
  editUserAddressAddressById(
    @Body() dto: EditUserAddressAddressDto,
    @Headers('Authorization') token: string,
  ) {
    return this.useAddressService.editUserAddressAddressById(dto, token);
  }

  @ApiOperation({ summary: 'Изменение названия адреса' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard)
  editUserAddressNameById(
    @Body() dto: EditUserAddressNameDto,
    @Headers('Authorization') token: string,
  ) {
    return this.useAddressService.editUserAddressNameById(dto, token);
  }

  @ApiOperation({ summary: 'Удаление адреса' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  deleteById(
    @Body() dto: DeleteUserAddressDto,
    @Headers('Authorization') token: string,
  ) {
    return this.useAddressService.deleteById(dto, token);
  }
}
