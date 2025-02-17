import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu, MenuDocument } from '@/schemas/menu.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSubMenuDto } from './dto/create-submenu.dto';
import { SubMenu, SubMenuDocument } from '@/schemas/subMenu.schema';
import { UpdateSubMenuDto } from './dto/update-submenu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    @InjectModel(SubMenu.name) private subMenuModel: Model<SubMenuDocument>,
  ) {}

  async createMenu(createMenuDto: CreateMenuDto) {
    const createdMenu = new this.menuModel(createMenuDto);
    return (await createdMenu.save()).toObject();
  }

  async createSubMenu(createSubMenuDto: CreateSubMenuDto) {
    const createdSubMenu = new this.subMenuModel(createSubMenuDto);
    return (await createdSubMenu.save()).toObject();
  }

  async findMany({ page = 1, row = 6 }) {
    const data = await this.menuModel
      .aggregate([
        {
          $lookup: {
            from: 'submenus',
            let: { menuId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$menuId', '$$menuId'] }],
                  },
                },
              },
            ],
            as: 'subMenus',
          },
        },
        {
          $skip: (Number(page) - 1) * Number(row),
        },
        {
          $limit: Number(row),
        },
      ])
      .exec();
    console.log(data);
    return {
      meta: {
        page,
        row,
        total: await this.menuModel.countDocuments().exec(),
      },
      data,
    };
  }

  async findAll() {
    return await this.menuModel
      .aggregate([
        {
          $lookup: {
            from: 'submenus',
            let: { menuId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$menuId', '$$menuId'] }],
                  },
                },
              },
            ],
            as: 'subMenus',
          },
        },
      ])
      .exec();
  }

  updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    console.log(updateMenuDto);
    return this.menuModel.findByIdAndUpdate(id, updateMenuDto, { new: true });
  }

  updateSubMenu(id: string, updateSubMenuDto: UpdateSubMenuDto) {
    console.log(updateSubMenuDto);
    return this.subMenuModel.findByIdAndUpdate(id, updateSubMenuDto, {
      new: true,
    });
  }

  async removeMenu(ids: string[]) {
    return await this.menuModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async removeSubMenu(ids: string[]) {
    return await this.subMenuModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
