import { UserEnable } from '@/common/rules/user-enable.rule';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  realname: string;

  @IsOptional()
  phoneNumber: string;

  // @IsOptional()
  // role: string | null;

  @IsOptional()
  @UserEnable()
  enable: boolean;

  @IsNotEmpty({ message: '页码 (page) 是必须的' })
  page: string;

  @IsNotEmpty({ message: '每页行数 (row) 是必须的' })
  row: string;
}
