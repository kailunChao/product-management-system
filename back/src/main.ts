import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ValidateException from './common/pipes/validate-exception.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useStaticAssets(join(__dirname, 'uploads'), { prefix: '/uploads' });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidateException(),
    new ValidationPipe({ transform: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
