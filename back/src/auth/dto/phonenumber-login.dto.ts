import { IsExistsRule } from '@/common/rules/is-exist.rule';
import { IsNotEmpty } from 'class-validator';

export class PhoneNumberLoginDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsExistsRule('user', ['phoneNumber'], {
    message: '该手机号不属于任何用户',
  })
  phoneNumber: string;
}
