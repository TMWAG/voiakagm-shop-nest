import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AddUserRoleDto } from './dto/add-user-role.dto';
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
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Добавление роли пользователю' })
  @ApiResponse({ status: 200, type: User })
  @Put('/add_role')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  addRole(@Body() dto: AddUserRoleDto) {
    return this.usersService.addRoleById(dto);
  }
}
