import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from '@/schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return (await createdProduct.save()).toObject();
  }

  async findMany(searchProductDto: SearchProductDto) {
    const { page, row } = searchProductDto;
    const filters: any = {};

    if (searchProductDto.name) {
      filters.name = { $regex: new RegExp(searchProductDto.name, 'i') };
    }

    if (searchProductDto.price) {
      filters.price = searchProductDto.price;
    }

    if (searchProductDto.quantity) {
      filters.quantity = searchProductDto.quantity;
    }

    const data = await this.productModel
      .aggregate([
        {
          $match: filters,
        },
        {
          $lookup: {
            from: 'files',
            let: { itemId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$type', 'product'] },
                      { $eq: ['$itemId', '$$itemId'] },
                    ],
                  },
                },
              },
            ],
            as: 'pics',
          },
        },
        {
          $lookup: {
            from: 'subcategories',
            localField: 'subCategoryId',
            foreignField: '_id',
            as: 'subcategory',
          },
        },
        {
          $unwind: {
            path: '$subcategory',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'subcategory.categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true,
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
            price: 1,
            quantity: 1,
            subCategoryId: 1,
            pics: 1,
            createdAt: 1,
            updatedAt: 1,
            category: {
              _id: '$category._id',
              name: '$category.name',
              icon: '$category.icon',
              introduce: '$category.introduce',
              createdAt: '$category.createdAt',
              updatedAt: '$category.updatedAt',
              subCategory: {
                _id: '$subcategory._id',
                name: '$subcategory.name',
                introduce: '$subcategory.introduce',
                categoryId: '$subcategory.categoryId',
                createdAt: '$subcategory.createdAt',
                updatedAt: '$subcategory.updatedAt',
              },
            },
          },
        },
      ])
      .exec();

    console.log(data);
    return {
      meta: {
        page,
        row,
        total: await this.productModel.countDocuments().exec(),
      },
      data,
    };
  }

  findProductGroupByCategory() {}

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async remove(ids: string[]) {
    return await this.productModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
