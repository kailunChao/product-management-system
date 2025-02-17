import { File, FileDocument } from '@/schemas/file.schema';
import { UserDocument } from '@/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(
    file: Express.Multer.File,
    type: string,
    user: UserDocument,
    itemId: string = null,
  ) {
    const { fieldname, originalname, mimetype, filename, path, size } = file;
    const createdFile = new this.fileModel({
      fieldname,
      originalname,
      mimetype,
      filename,
      path: path.replace(/.*?(?=\\uploads)/, '').replace(/\\/g, '/'),
      size: size.toString(),
      type,
      userId: user._id,
      itemId,
    });

    return (await createdFile.save()).toObject();
  }

  async remove(id: string) {
    return await this.fileModel.findByIdAndDelete(id).lean().exec();
  }
}
