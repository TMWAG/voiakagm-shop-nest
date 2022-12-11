import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}
  //create
  async create(dto: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.create({
        name: dto.name,
        vendorId: dto.vendorId,
        categoryId: dto.categoryId,
        price: dto.price,
        discount: dto.discount,
        description: dto.description,
      });
      return product;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //get
  async getAll(
    dto: PaginationDto,
  ): Promise<{ rows: Product[]; count: number }> {
    try {
      const page = dto.page || 1;
      const limit = dto.limit || 12;
      const offset = page * limit - limit;
      const products = await this.productRepository.findAndCountAll({
        limit,
        offset,
        order: [['id', 'ASC']],
      });
      return products;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllByVendorId(
    dto: GetAllProductsByVendorIdDto,
    pageDto: PaginationDto,
  ): Promise<{ rows: Product[]; count: number }> {
    try {
      const page = pageDto.page || 1;
      const limit = pageDto.limit || 12;
      const offset = page * limit - limit;
      const products = await this.productRepository.findAndCountAll({
        where: { vendorId: dto.vendorId },
        limit,
        offset,
        order: [['id', 'ASC']],
      });
      return products;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllByCategoryId(
    dto: GetAllProductsByCategoryIdDto,
    pageDto: PaginationDto,
  ): Promise<{ rows: Product[]; count: number }> {
    try {
      const page = pageDto.page || 1;
      const limit = pageDto.limit || 12;
      const offset = page * limit - limit;
      const products = await this.productRepository.findAndCountAll({
        where: { categoryId: dto.categoryId },
        limit,
        offset,
        order: [['id', 'ASC']],
      });
      return products;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOneById(dto: GetOneProductById): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: dto.id },
      });
      if (!product) {
        throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //update
  async editName(dto: EditProductNameDto): Promise<boolean> {
    try {
      const product = await this.productRepository.update(
        { name: dto.name },
        { where: { id: dto.id } },
      );
      return Boolean(product);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeCategory(dto: ChangeProductCategoryDto): Promise<boolean> {
    try {
      const product = await this.productRepository.update(
        { categoryId: dto.categoryId },
        { where: { id: dto.id } },
      );
      return Boolean(product);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changePrice(dto: ChangeProductPriceDto): Promise<boolean> {
    try {
      const product = await this.productRepository.update(
        { price: dto.price },
        { where: { id: dto.id } },
      );
      return Boolean(product);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeVendor(dto: ChangeProductVendorDto): Promise<boolean> {
    try {
      const product = await this.productRepository.update(
        { vendorId: dto.vendorId },
        { where: { id: dto.id } },
      );
      return Boolean(product);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async setDiscount(dto: SetProductDiscountDto): Promise<boolean> {
    try {
      const product = await this.productRepository.update(
        { discount: dto.discount },
        { where: { id: dto.id } },
      );
      return Boolean(product);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeDiscount(dto: DeleteProductDiscountDto): Promise<boolean> {
    try {
      const product = await this.productRepository.update(
        { discount: null },
        { where: { id: dto.id } },
      );
      return Boolean(product);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  //delete
  async deleteById(dto: DeleteProductDto): Promise<boolean> {
    try {
      const product = await this.productRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(product);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
