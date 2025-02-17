import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateSubMenuDto } from './dto/create-submenu.dto';
import { UpdateSubMenuDto } from './dto/update-submenu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('firstMenu')
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    console.log(createMenuDto);
    return this.menuService.createMenu(createMenuDto);
  }

  @Post('subMenu')
  createSubMenu(@Body() createSubMenuDto: CreateSubMenuDto) {
    return this.menuService.createSubMenu(createSubMenuDto);
  }

  @Get()
  findMany(@Query() query: { page: number; row: number }) {
    return this.menuService.findMany(query);
  }

  @Get('all')
  findAll() {
    return this.menuService.findAll();
  }

  @Patch('firstMenu/:id')
  updateMenu(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    console.log('更新菜单');
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  @Patch('subMenu/:id')
  updateSubMenu(
    @Param('id') id: string,
    @Body() updateSubMenuDto: UpdateSubMenuDto,
  ) {
    return this.menuService.updateSubMenu(id, updateSubMenuDto);
  }

  @Delete('firstMenu')
  removeMenu(@Body() { ids }: { ids: string[] }) {
    return this.menuService.removeMenu(ids);
  }

  @Delete('subMenu')
  removeSubMenu(@Body() { ids }: { ids: string[] }) {
    return this.menuService.removeSubMenu(ids);
  }
}
