import { IsNotEmpty, Length } from 'class-validator';

export class CreateShortMessageDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @Length(11, 11, { message: '请输入11位数手机号' })
  phoneNumber: string;
}
