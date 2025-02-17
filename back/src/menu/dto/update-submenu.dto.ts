import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';

export class UpdateSubMenuDto {
  @IsOptional()
  @IsNotEmpty({ message: '菜单名称不能为空' })
  @IsNotExistsRule('menu', ['name'], {
    message: '该菜单名称已经存在',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: '路径不能为空' })
  path: string;

  @IsOptional()
  @MaxLength(100, { message: '描述字符超出限制' })
  introduce: string;
}
