import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsNotEmpty({ message: '名称不能为空' })
  @IsNotExistsRule('role', ['name'], {
    message: '该角色已经存在',
  })
  name: string;

  @IsOptional()
  @MaxLength(100, { message: '描述字符超出限制' })
  introduce: string;

  subMenus: string[];
}
