import { Controller, Post, Body } from '@nestjs/common';
import { ShortMessageService } from './short-message.service';
import { CreateShortMessageDto } from './dto/create-short-message.dto';
import { CheckShortMessageDto } from './dto/check-short-message.dto';

@Controller('short-message')
export class ShortMessageController {
  constructor(private readonly shortMessageService: ShortMessageService) {}

  @Post('captcha')
  create(@Body() createShortMessageDto: CreateShortMessageDto) {
    console.log(createShortMessageDto)
    return this.shortMessageService.create(createShortMessageDto);
  }

  @Post('captcha/verify')
  check(@Body() checkShortMessageDto: CheckShortMessageDto) {
    return this.shortMessageService.check(checkShortMessageDto);
  }
}
