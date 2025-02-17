import {
  applyDecorators,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import dayjs from 'dayjs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

// 约束上传文件的类型
export const useFileFilter =
  (type: string) =>
  (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.includes(type)) {
      callback(new UnsupportedMediaTypeException('文件类型错误'), false);
    } else {
      callback(null, true);
    }
  };

// 约束上传文件的路径dist/upload/xxx
export const useDiskStorage = (fileName: string) =>
  diskStorage({
    destination: join(
      __dirname,
      `../../uploads/${dayjs().format('YYYY/MM')}/${fileName}`,
    ),
    filename: (_, file, callback) => {
      const path =
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e10) +
        extname(file.originalname);
      callback(null, path);
    },
  });

// 上传文件装饰器
export const Upload = (field = 'file', options: MulterOptions) => {
  // console.log(__dirname);
  return field === 'file'
    ? applyDecorators(UseInterceptors(FileInterceptor(field, options)))
    : applyDecorators(UseInterceptors(FilesInterceptor(field, 9, options)));
};
