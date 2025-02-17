import { IsExistsRule } from 'src/common/rules/is-exist.rule';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AccountLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsExistsRule('user', ['name'], {
    message: '用户不存在',
  })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码不能小于六位' })
  password: string;
}
