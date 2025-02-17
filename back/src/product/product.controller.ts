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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findMany(@Query() query: SearchProductDto) {
    return this.productService.findMany(query);
  }

  // @Get()
  // findProductGroupByCategory(){
  //   return this.productService.findProductGroupByCategory()
  // }

  // @Get()
  // findProductGroupBySubCategory(){
    
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete()
  remove(@Body() { ids }: { ids: string[] }) {
    return this.productService.remove(ids);
  }
}
