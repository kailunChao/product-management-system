import { File } from '@/schemas/file.schema';
import { Role } from '@/schemas/role.schema';
import { User } from '@/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import mongoose, { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(File.name) private fileModel: Model<File>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('PUBLIC_KEY'), // 使用公钥
      algorithms: ['RS256'], // 指定算法
    });
  }

  async validate({ id }: { id: string }) {
    const user = await this.userModel
      .aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }, // 匹配用户
        },
        {
          $lookup: {
            from: 'files', // File 集合的名称
            let: { userId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$type', 'avatar'] },
                      { $eq: ['$userId', '$$userId'] },
                    ],
                  },
                },
              },
              {
                $sort: { updatedAt: -1 }, // 按 updatedAt 字段降序排序
              },
              {
                $limit: 1, // 限制结果为1条
              },
            ],
            as: 'avatar', // 将结果存储在 avatar 字段
          },
        },
        {
          $unwind: {
            path: '$avatar', // 展开 avatar 数组，如果数组为空则不展开
            preserveNullAndEmptyArrays: true, // 保留空数组
          },
        },
        {
          $addFields: {
            avatar: '$avatar.path', // 只选择 avatar 字段中的 path 字段
          },
        },
      ])
      .exec();

    if (user[0].role) {
      const role = await this.roleModel
        .aggregate([
          {
            $match: { _id: user[0].role },
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
      return {
        ...user[0],
        role: role[0],
        menus: role[0].menus,
      };
    }
    return { ...user[0], menus: [] };
  }
}
