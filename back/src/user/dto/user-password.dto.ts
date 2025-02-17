import { IsConfirm } from '@/common/rules/is-confirm.rule';
import { IsNotEmpty } from 'class-validator';

export class UserPasswordDto {
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirm({ message: '两次密码不一致' })
  password: string;
}
