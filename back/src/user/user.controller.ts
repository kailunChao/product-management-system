import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/currentUser.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from '@/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('current')
  @Auth()
  getOne(@CurrentUser() user: UserDocument) {
    return user;
  }

  // @Get()
  // @Auth()
  // getMany(@Query() query: { page: string; row: string }) {
  //   const { page, row } = query;
  //   return this.userService.findMany({ page: Number(page), row: Number(row) });
  // }

  @Get()
  @Auth()
  getMany(@Query() searchUserDto: SearchUserDto) {
    return this.userService.findMany(searchUserDto);
  }

  @Patch(':id')
  @Auth()
  async password(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUserInfo(id, updateUserDto);
  }

  @Delete()
  @Auth()
  removeMany(@Body() { ids }: { ids: string[] }) {
    console.log(ids);
    return this.userService.removeMany(ids);
  }
}
