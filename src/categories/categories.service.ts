import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import {
  CategoryAttribute,
  CategoryAttributeDocument
} from './schemas/category-attribute.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,

    @InjectModel(CategoryAttribute.name)
    private attributeModel: Model<CategoryAttributeDocument>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    return this.categoryModel.create(dto);
  }

  async getAllCategories() {
    return this.categoryModel.find({ isActive: true });
  }

  async createAttribute(dto: CreateAttributeDto) {
    return this.attributeModel.create(dto);
  }

  async getAttributes(categoryId: string) {
    return this.attributeModel.find({ categoryId });
  }
}
