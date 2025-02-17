import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '名称不能为空' })
  @IsNotExistsRule('role', ['name'], {
    message: '该角色已经存在',
  })
  name: string;

  @MaxLength(100, { message: '描述字符超出限制' })
  introduce: string;

  subMenus: string[];
}
