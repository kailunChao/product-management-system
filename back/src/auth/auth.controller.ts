import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountLoginDto } from './dto/account-login.dto';
import { PhoneNumberLoginDto } from './dto/phonenumber-login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('accountLogin')
  async accountLogin(@Body() accountLoginDto: AccountLoginDto) {
    return this.authService.accountLogin(accountLoginDto);
  }

  @Post('phoneNumberLogin')
  async phoneNumberLogin(@Body() phoneNumberLoginDto: PhoneNumberLoginDto) {
    return this.authService.phoneNumberLogin(phoneNumberLoginDto);
  }

  @Post('forgotPassword')
  async updatePasssword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePasssword(updatePasswordDto);
  }
}
