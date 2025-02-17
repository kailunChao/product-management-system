import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(registerDto: CreateUserDto) {
    const createdUser = new this.userModel({
      ...registerDto,
      password: await hash(registerDto.password),
    });
    return (await createdUser.save()).toObject();
  }

  async findMany(searchUserDto: SearchUserDto) {
    const { page, row } = searchUserDto;
    const filters: any = {};

    if (searchUserDto.name) {
      filters.name = { $regex: new RegExp(searchUserDto.name, 'i') };
    }

    if (searchUserDto.realname) {
      filters.realname = { $regex: new RegExp(searchUserDto.realname, 'i') };
    }

    if (searchUserDto.phoneNumber) {
      filters.phoneNumber = {
        $regex: new RegExp(searchUserDto.phoneNumber, 'i'),
      };
    }

    if (searchUserDto.enable !== undefined) {
      filters.enable = searchUserDto.enable;
    }
    const data = await this.userModel
      .aggregate([
        {
          $match: filters, // 模糊查询匹配条件
        },
        {
          $lookup: {
            from: 'files',
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
                $sort: { updatedAt: -1 },
              },
              {
                $limit: 1,
              },
            ],
            as: 'avatar',
          },
        },
        {
          $unwind: {
            path: '$avatar',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            avatar: { $ifNull: ['$avatar.path', null] },
          },
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: '_id',
            as: 'role',
          },
        },
        {
          $unwind: {
            path: '$role',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            role: { $ifNull: ['$role.name', null] }, // 将角色信息的 name 字段赋值给 user 的 role 字段
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
      ])
      .exec();

    console.log(data);
    return {
      meta: {
        page,
        row,
        total: await this.userModel.countDocuments(filters).exec(),
      },
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateUserInfo(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async removeMany(ids: string[]) {
    return await this.userModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
