import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '@/schemas/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}
  async create(createRoleDto: CreateRoleDto) {
    const createdRole = new this.roleModel(createRoleDto);
    return (await createdRole.save()).toObject();
  }

  findAll() {
    return this.roleModel.find().lean().exec();
  }

  async findOne(id: string) {
    const data = await this.roleModel
      .aggregate([
        {
          $match: { _id: id },
        },
        {
          $lookup: {
            from: 'submenus',
            localField: 'subMenus',
            foreignField: '_id',
            as: 'subMenus',
          },
        },
        {
          $unwind: {
            path: '$subMenus',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'menus',
            localField: 'subMenus.menuId',
            foreignField: '_id',
            as: 'menu',
          },
        },
        {
          $unwind: {
            path: '$menu',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: {
              roleId: '$_id',
              menuId: '$menu._id',
            },
            roleId: { $first: '$_id' },
            name: { $first: '$name' },
            introduce: { $first: '$introduce' },
            menu: {
              $first: '$menu',
            },
            subMenus: {
              $push: '$subMenus',
            },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        {
          $group: {
            _id: '$roleId',
            name: { $first: '$name' },
            introduce: { $first: '$introduce' },
            menus: {
              $push: {
                _id: '$_id.menuId',
                name: '$menu.name',
                icon: '$menu.icon',
                introduce: '$menu.introduce',
                subMenus: '$subMenus',
                createdAt: '$menu.createdAt',
                updatedAt: '$menu.updatedAt',
              },
            },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            introduce: 1,
            menus: {
              $sortArray: {
                input: '$menus',
                sortBy: { createdAt: 1 },
              },
            },
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ])
      .exec();
    return data;
  }

  async findMany({ page = 1, row = 6 }) {
    const data = await this.roleModel
      .aggregate([
        {
          $lookup: {
            from: 'submenus',
            localField: 'subMenus',
            foreignField: '_id',
            as: 'subMenus',
          },
        },
        {
          $unwind: {
            path: '$subMenus',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'menus',
            localField: 'subMenus.menuId',
            foreignField: '_id',
            as: 'menu',
          },
        },
        {
          $unwind: {
            path: '$menu',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: {
              roleId: '$_id',
              menuId: '$menu._id',
            },
            roleId: { $first: '$_id' },
            name: { $first: '$name' },
            introduce: { $first: '$introduce' },
            menu: {
              $first: '$menu',
            },
            subMenus: {
              $push: '$subMenus',
            },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        {
          $group: {
            _id: '$roleId',
            name: { $first: '$name' },
            introduce: { $first: '$introduce' },
            menus: {
              $push: {
                _id: '$_id.menuId',
                name: '$menu.name',
                icon: '$menu.icon',
                introduce: '$menu.introduce',
                subMenus: '$subMenus',
                createdAt: '$menu.createdAt',
                updatedAt: '$menu.updatedAt',
              },
            },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: (Number(page) - 1) * Number(row),
        },
        {
          $limit: Number(row),
        },
        {
          $project: {
            _id: 1,
            name: 1,
            introduce: 1,
            menus: {
              $sortArray: {
                input: '$menus',
                sortBy: { createdAt: 1 },
              },
            },
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ])
      .exec();

    console.log(data);
    return {
      meta: {
        page,
        row,
        total: await this.roleModel.countDocuments().exec(),
      },
      data,
    };
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async removeMany(ids: string[]) {
    return await this.roleModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
