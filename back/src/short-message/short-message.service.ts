import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateShortMessageDto } from './dto/create-short-message.dto';
import { ConfigService } from '@nestjs/config';
import * as Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as OpenApi from '@alicloud/openapi-client';
import * as Util from '@alicloud/tea-util';
import { CheckShortMessageDto } from './dto/check-short-message.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import md5 from 'md5';

@Injectable()
export class ShortMessageService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private configService: ConfigService,
  ) {}

  async create(createShortMessageDto: CreateShortMessageDto) {
    console.log(typeof createShortMessageDto.phoneNumber);
    const key = md5(createShortMessageDto.phoneNumber);
    const captcha = String(Math.floor(Math.random() * 900000) + 100000);
    await this.cache.set(key, captcha);

    return this.send(createShortMessageDto, captcha);
  }

  async send(createShortMessageDto: CreateShortMessageDto, captcha: string) {
    const smsConfig = new (OpenApi as any).Config({
      accessKeyId: this.configService.get<string>(
        'ALIBABA_CLOUD_ACCESS_KEY_ID',
      ),
      accessKeySecret: this.configService.get<string>(
        'ALIBABA_CLOUD_ACCESS_KEY_SECRET',
      ),
    });

    smsConfig.endpoint = `dysmsapi.aliyuncs.com`;

    const client = new (Dysmsapi20170525 as any).default(smsConfig);
    const sendSmsRequest = new (Dysmsapi20170525 as any).SendSmsRequest({
      signName: '单词星球',
      templateCode: 'SMS_474080243',
      phoneNumbers: createShortMessageDto.phoneNumber,
      templateParam: JSON.stringify({ code: captcha }),
    });

    const runtime = new (Util as any).RuntimeOptions({});
    try {
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
      return { message: '验证码发送成功' };
    } catch (error) {
      (Util as any).default.assertAsString(error.message);
      console.log(error.message);
      throw new HttpException(
        '验证码发送失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async check(checkShortMessageDto: CheckShortMessageDto) {
    const key = md5(checkShortMessageDto.phoneNumber);
    const captcha = await this.cache.get(key);
    if (checkShortMessageDto.captcha === captcha) {
      return { message: '验证码输入正确' };
    } else {
      throw new BadRequestException('验证码输入错误');
    }
  }
}
