import { IsNotExistsRule } from '@/common/rules/is-not-exist.rule';
import { Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(1, { message: '用户名应至少为1位' })
  @IsNotExistsRule('user', ['name'], {
    message: '该用户名已经存在',
  })
  name: string;

  @MinLength(2, { message: '用户姓名应至少为2位' })
  @IsNotExistsRule('user', ['realname'], {
    message: '该用户已经存在',
  })
  realname: string;

  password: string;

  @Length(11, 11, { message: '手机号应为11位' })
  phoneNumber: string;

  role: string | null;

  enable: boolean;
}
