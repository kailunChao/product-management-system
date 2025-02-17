import { IsConfirm } from '@/common/rules/is-confirm.rule';
import { IsExistsRule } from '@/common/rules/is-exist.rule';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsExistsRule('user', ['phoneNumber'], {
    message: '该手机号不属于任何用户',
  })
  phoneNumber: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirm({ message: '两次密码输入不一致' })
  password: string;
}
