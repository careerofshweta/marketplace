import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post('attribute')
  createAttribute(@Body() dto: CreateAttributeDto) {
    return this.categoriesService.createAttribute(dto);
  }

  @Get(':id/attributes')
  getAttributes(@Param('id') id: string) {
    return this.categoriesService.getAttributes(id);
  }
}
