import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsNotExistsRule('subcategory', ['name'], {
    message: '该分类名称已经存在',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: '图标名称不能为空' })
  icon: string;

  @IsOptional()
  @MaxLength(100, { message: '描述字符超出限制' })
  introduce: string;
}
