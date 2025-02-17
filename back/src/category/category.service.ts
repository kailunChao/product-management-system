import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '@/schemas/category.schema';
import { SubCategory, SubCategoryDocument } from '@/schemas/subCategory.schema';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';
import { Product, ProductDocument } from '@/schemas/product.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return (await createdCategory.save()).toObject();
  }

  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const createdSubCategory = new this.subCategoryModel(createSubCategoryDto);
    return (await createdSubCategory.save()).toObject();
  }

  async findMany({ page = 1, row = 6 }) {
    const data = await this.categoryModel
      .aggregate([
        {
          $lookup: {
            from: 'subcategories',
            let: { categoryId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$categoryId', '$$categoryId'] }],
                  },
                },
              },
            ],
            as: 'subCategories',
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
        total: await this.categoryModel.countDocuments().exec(),
      },
      data,
    };
  }

  async findAll() {
    return await this.categoryModel
      .aggregate([
        {
          $lookup: {
            from: 'subcategories',
            let: { categoryId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$categoryId', '$$categoryId'] }],
                  },
                },
              },
            ],
            as: 'subCategories',
          },
        },
      ])
      .exec();
  }

  async findAllWithProduct() {
    const data = await this.categoryModel
      .aggregate([
        {
          $lookup: {
            from: 'subcategories',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'subcategories',
          },
        },
        {
          $unwind: {
            path: '$subcategories',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'subcategories._id',
            foreignField: 'subCategoryId',
            as: 'products',
          },
        },
        {
          $group: {
            _id: '$name',
            value: { $sum: { $size: '$products' } },
          },
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            value: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .exec();
    return data;
  }

  async findAllWithSubProduct() {
    const data = await this.subCategoryModel
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'subCategoryId',
            as: 'products',
          },
        },
        {
          $addFields: {
            value: { $size: '$products' },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            value: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .exec();
    return data;
  }

  async getStatistics() {
    return [
      {
        name: '分类总数',
        value: await this.categoryModel.countDocuments().exec(),
      },
      {
        name: '类目总数',
        value: await this.subCategoryModel.countDocuments().exec(),
      },
      {
        name: '商品总数',
        value: await this.productModel.countDocuments().exec(),
      },
    ];
  }

  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  updateSubCategory(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryModel.findByIdAndUpdate(id, updateSubCategoryDto, {
      new: true,
    });
  }

  async removeCategory(ids: string[]) {
    return await this.categoryModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async removeSubCategory(ids: string[]) {
    return await this.subCategoryModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
