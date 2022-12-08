import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { EditCategoryNameDto } from './dto/edit-category-name.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryRepository.create({ name: dto.name });
      return category;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.findAll();
      return categories;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editName(dto: EditCategoryNameDto): Promise<boolean> {
    try {
      const category = await this.categoryRepository.update(
        { name: dto.name },
        { where: { id: dto.id } },
      );
      return Boolean(category);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(dto: DeleteCategoryDto): Promise<boolean> {
    try {
      const category = await this.categoryRepository.destroy({
        where: { id: dto.id },
      });
      return Boolean(category);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
