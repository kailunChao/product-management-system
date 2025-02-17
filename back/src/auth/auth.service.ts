import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AccountLoginDto } from './dto/account-login.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import { Model } from 'mongoose';
import { PhoneNumberLoginDto } from './dto/phonenumber-login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async accountLogin(accountLoginDto: AccountLoginDto) {
    const user = await this.userModel
      .findOne({ name: accountLoginDto.name })
      .exec();
    if (!(await verify(user.password, accountLoginDto.password))) {
      throw new BadRequestException('密码输入错误');
    }
    if (!user.enable) {
      throw new ForbiddenException('该用户已被禁用');
    }
    return this.token(user);
  }

  async phoneNumberLogin(phoneNumberLoginDto: PhoneNumberLoginDto) {
    const user = await this.userModel
      .findOne({ phoneNumber: phoneNumberLoginDto.phoneNumber })
      .exec();
    if (!user.enable) {
      throw new ForbiddenException('该用户已被禁用');
    }
    return this.token(user);
  }

  async updatePasssword(updatePasswordDto: UpdatePasswordDto) {
    await this.userModel
      .findOneAndUpdate(
        { phoneNumber: updatePasswordDto.phoneNumber },
        { password: await hash(updatePasswordDto.password) },
        { new: true },
      )
      .exec();
    return {
      message: '密码修改成功',
    };
  }

  private async token({ _id, name }) {
    return {
      message: `欢迎回来，${name}`,
      data: {
        token: await this.jwt.signAsync({
          id: _id.toString(),
        }),
      },
    };
  }
}
