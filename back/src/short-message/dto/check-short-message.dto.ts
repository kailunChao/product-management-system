import { IsNotEmpty, Length } from 'class-validator';

export class CheckShortMessageDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  phoneNumber: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @Length(6, 6, { message: '请输入6位数验证码' })
  captcha: string;
}
