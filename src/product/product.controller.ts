import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ChangeProductCategoryDto } from './dto/change-product-category.dto';
import { ChangeProductPriceDto } from './dto/change-product-price.dto';
import { ChangeProductVendorDto } from './dto/change-product-vendor.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDiscountDto } from './dto/delete-product-discount.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { EditProductNameDto } from './dto/edit-product-name.dto';
import { GetAllProductsByCategoryIdDto } from './dto/get-all-products-by-category-id.dto';
import { GetAllProductsByVendorIdDto } from './dto/get-all-products-by-vendor-id.dto';
import { GetOneProductById } from './dto/get-one-product-by-id.dto';
import { PaginationDto } from './dto/pagination.dto';
import { SetProductDiscountDto } from './dto/set-product-discount.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@ApiTags('Товары')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Добавление товара' })
  @ApiResponse({ status: 200, type: Product })
  @Post('/create')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @ApiOperation({ summary: 'Все товары с пагинацией' })
  @ApiResponse({ status: 200 })
  @Get('/all')
  getAll(@Query() dto: PaginationDto) {
    return this.productService.getAll(dto);
  }

  @ApiOperation({ summary: 'Все товары по id производителя' })
  @ApiResponse({ status: 200 })
  @Get('/vendor/:vendorId')
  getAllByVendorId(
    @Param() dto: GetAllProductsByVendorIdDto,
    @Query() pageDto: PaginationDto,
  ) {
    return this.productService.getAllByVendorId(dto, pageDto);
  }

  @ApiOperation({ summary: 'Все товары по id категории' })
  @ApiResponse({ status: 200 })
  @Get('/category/:categoryId')
  getAllByCategoryId(
    @Param() dto: GetAllProductsByCategoryIdDto,
    @Query() pageDto: PaginationDto,
  ) {
    return this.productService.getAllByCategoryId(dto, pageDto);
  }

  @ApiOperation({ summary: 'Товар по id' })
  @ApiResponse({ status: 200, type: Product })
  @Get('/id/:id')
  getOneById(@Param() dto: GetOneProductById) {
    return this.productService.getOneById(dto);
  }

  @ApiOperation({ summary: 'Изменить название' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/edit_name')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  editName(@Body() dto: EditProductNameDto) {
    return this.productService.editName(dto);
  }

  @ApiOperation({ summary: 'Изменить id категории' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/change_category')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  changeCategory(@Body() dto: ChangeProductCategoryDto) {
    return this.productService.changeCategory(dto);
  }

  @ApiOperation({ summary: 'Изменить цену' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/change_price')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  changePrice(@Body() dto: ChangeProductPriceDto) {
    return this.productService.changePrice(dto);
  }

  @ApiOperation({ summary: 'Изменить id производителя' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/change_vendor')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  changeVendor(@Body() dto: ChangeProductVendorDto) {
    return this.productService.changeVendor(dto);
  }

  @ApiOperation({ summary: 'Установить скидку' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/set_discount')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  setDiscount(@Body() dto: SetProductDiscountDto) {
    return this.productService.setDiscount(dto);
  }

  @ApiOperation({ summary: 'Убрать скидку' })
  @ApiResponse({ status: 200, type: Boolean })
  @Put('/remove_discount')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  removeDiscount(@Body() dto: DeleteProductDiscountDto) {
    return this.productService.removeDiscount(dto);
  }

  @ApiOperation({ summary: 'Удалить товар' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete('/delete')
  @Roles('ADMIN', 'SUPERVISOR')
  @UseGuards(RolesGuard)
  deleteById(@Body() dto: DeleteProductDto) {
    return this.productService.deleteById(dto);
  }
}
