import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsOptional()
  @IsNotEmpty({ message: '子类目名称不能为空' })
  @IsNotExistsRule('subcategory', ['name'], {
    message: '该子类目名称已经存在',
  })
  name: string;

  @IsOptional()
  @MaxLength(100, { message: '描述字符超出限制' })
  introduce: string;
}
