import { Module } from '@nestjs/common';
import { ShortMessageService } from './short-message.service';
import { ShortMessageController } from './short-message.controller';

@Module({
  controllers: [ShortMessageController],
  providers: [ShortMessageService],
})
export class ShortMessageModule {}
