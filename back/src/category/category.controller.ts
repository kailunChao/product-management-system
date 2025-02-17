import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('firstCategory')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('subCategory')
  createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.categoryService.createSubCategory(createSubCategoryDto);
  }

  @Get()
  findMany(@Query() query: { page: number; row: number }) {
    return this.categoryService.findMany(query);
  }

  @Get('all')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('chart')
  findAllWithProduct() {
    return this.categoryService.findAllWithProduct();
  }

  @Get('chart/detail')
  findAllWithSubProduct() {
    return this.categoryService.findAllWithSubProduct();
  }

  @Get('chart/statistics')
  getStatistics() {
    return this.categoryService.getStatistics();
  }

  @Patch('firstCategory/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Patch('subCategory/:id')
  updateSubCategory(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.categoryService.updateSubCategory(id, updateSubCategoryDto);
  }

  @Delete('firstCategory')
  removeCategory(@Body() { ids }: { ids: string[] }) {
    return this.categoryService.removeCategory(ids);
  }

  @Delete('subCategory')
  removeSubCategory(@Body() { ids }: { ids: string[] }) {
    return this.categoryService.removeSubCategory(ids);
  }
}
