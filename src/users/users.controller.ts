import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from 'src/product/dto/pagination.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AddTgLinkDto } from './dto/add-tg-link.dto';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { AddVkLinkDto } from './dto/add-vk-link.dto';
import { DeleteUserByIdDto } from './dto/delete-user-by-id';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/all')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getAll(@Query() dto: PaginationDto) {
    return this.usersService.getAllUsers(dto);
  }

  @ApiOperation({ summary: 'Добавление роли пользователю' })
  @ApiResponse({ status: 200, type: User })
  @Put('/add_role')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  addRoleById(@Body() dto: AddUserRoleDto) {
    return this.usersService.addRoleById(dto);
  }

  @ApiOperation({ summary: 'Добавление пользователю ссылки на телеграм' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/add_tg_link')
  @UseGuards(JwtAuthGuard)
  addTgLinkById(@Body() dto: AddTgLinkDto) {
    return this.usersService.addTgLinkById(dto);
  }

  @ApiOperation({ summary: 'Добавление пользователю ссылки на ВК' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/add_vk_link')
  @UseGuards(JwtAuthGuard)
  addVkLinkById(@Body() dto: AddVkLinkDto) {
    return this.usersService.addVkLinkById(dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  deleteById(@Body() dto: DeleteUserByIdDto) {
    return this.usersService.deleteById(dto);
  }
}
