// image.decorator.ts
import { useFileFilter, Upload, useDiskStorage } from './upload.decorator';

export const UploadImage = (field = 'file') =>
  Upload(field, {
    limits: { fieldSize: Math.pow(1024, 2) * 10 },
    fileFilter: useFileFilter('image'),
    storage: useDiskStorage('image'),
  });

export const UploadImages = (field = 'files') =>
  Upload(field, {
    limits: { fieldSize: Math.pow(1024, 2) * 10 },
    fileFilter: useFileFilter('image'),
    storage: useDiskStorage('image'),
  });
