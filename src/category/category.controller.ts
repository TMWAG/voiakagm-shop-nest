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
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { EditCategoryNameDto } from './dto/edit-category-name.dto';

@ApiTags('Категории')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Добавление новой категории' })
  @ApiResponse({ status: 200, type: Category })
  @Post('/create')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('/all')
  getAll() {
    return this.categoryService.getAll();
  }

  @ApiOperation({ summary: 'Изменение названия категории' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/change_name')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  editName(@Body() dto: EditCategoryNameDto) {
    return this.categoryService.editName(dto);
  }

  @ApiOperation({ summary: 'Удаление категории по Id' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  deleteById(@Body() dto: DeleteCategoryDto) {
    return this.categoryService.deleteById(dto);
  }
}
