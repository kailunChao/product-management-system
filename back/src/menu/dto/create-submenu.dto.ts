import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';
import { IsMongoId, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateSubMenuDto {
  @IsNotEmpty({ message: '菜单名称不能为空' })
  @IsNotExistsRule('submenu', ['name'], {
    message: '该菜单名称已经存在',
  })
  name: string;

  @IsNotEmpty({ message: '路径不能为空' })
  path: string;

  @IsOptional()
  @MaxLength(100, { message: '描述字符超出限制' })
  introduce: string;

  @IsMongoId({ message: '菜单id错误' })
  menuId: string;
}
