import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { UploadImage } from './decorator/image.decorator';
import { Auth } from '@/common/decorators/auth.decorator';
import { UploadService } from './upload.service';
import { CurrentUser } from '@/common/decorators/currentUser.decorator';
import { UserDocument } from '@/schemas/user.schema';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('avatar')
  @Auth()
  @UploadImage()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserDocument,
  ) {
    return this.uploadService.create(file, 'avatar', user);
  }

  @Post('product')
  @Auth()
  @UploadImage()
  async uploadFiles(
    @Body() body: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserDocument,
  ) {
    console.log(body.id, file);
    return this.uploadService.create(file, 'product', user, body.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(123, id);
    return this.uploadService.remove(id);
  }
}
