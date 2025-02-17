import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as fs from 'fs';
import { UploadModule } from './upload/upload.module';
// import { CaptchaModule } from './captcha/captcha.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ShortMessageModule } from './short-message/short-message.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          PRIVATE_KEY: fs.readFileSync('src/keys/private.key', 'utf8'),
          PUBLIC_KEY: fs.readFileSync('src/keys/public.key', 'utf8'),
        }),
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ShortMessageModule,
    // SoftModule,
    UploadModule,
    // CaptchaModule,
    CacheModule.register({
      ttl: 6000000,
      isGlobal: true,
    }),
    UserModule,
    CommonModule,
    RoleModule,
    MenuModule,
    ProductModule,
    CategoryModule,
    // UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
