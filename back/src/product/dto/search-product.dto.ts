import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class SearchProductDto {
  @IsOptional()
  @IsNotEmpty({ message: '商品名称不能为空' })
  @IsNotExistsRule('product', ['name'], {
    message: '该商品名称已经存在',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: '商品价格不能为空' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: '商品价格必须是数字' })
  @IsPositive({ message: '商品价格必须是正数' })
  price: number;

  @IsOptional()
  @IsNotEmpty({ message: '商品价格不能为空' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: '商品价格必须是数字' })
  @IsInt({ message: '商品数量必须是整数' })
  @Min(0, { message: '商品数量不能为负数' })
  quantity: number;

  @IsNotEmpty({ message: '页码 (page) 是必须的' })
  page: string;

  @IsNotEmpty({ message: '每页行数 (row) 是必须的' })
  row: string;
}
