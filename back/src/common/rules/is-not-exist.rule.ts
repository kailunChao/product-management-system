import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { Role } from '@/schemas/role.schema';
import { Menu } from '@/schemas/menu.schema';
import { SubMenu } from '@/schemas/subMenu.schema';
import { Category } from '@/schemas/category.schema';
import { SubCategory } from '@/schemas/subCategory.schema';
import { Product } from '@/schemas/product.schema';

@ValidatorConstraint({ async: true })
export class IsNotExistsRuleValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    @InjectModel(SubMenu.name) private subMenuModel: Model<SubMenu>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const [table, fields] = args.constraints;
    let res;
    if (table === 'user') {
      res = await this.userModel
        .findOne({ $or: fields.map((field) => ({ [field]: value })) })
        .exec();
    }
    if (table === 'role') {
      res = await this.roleModel
        .findOne({ $or: fields.map((field) => ({ [field]: value })) })
        .exec();
    }
    if (table === 'menu') {
      res = await this.menuModel
        .findOne({ $or: fields.map((field) => ({ [field]: value })) })
        .exec();
    }
    if (table === 'submenu') {
      res = await this.subMenuModel
        .findOne({ $or: fields.map((field) => ({ [field]: value })) })
        .exec();
    }
    if (table === 'category') {
      res = await this.categoryModel
        .findOne({ $or: fields.map((field) => ({ [field]: value })) })
        .exec();
    }
    if (table === 'subcategory') {
      res = await this.subCategoryModel
        .findOne({ $or: fields.map((field) => ({ [field]: value })) })
        .exec();
    }
    if (table === 'product') {
      res = await this.productModel
        .findOne({ $or: fields.map((field) => ({ [field]: value })) })
        .exec();
    }
    return !Boolean(res);
  }

  defaultMessage() {
    // args: ValidationArguments
    // const [table, fields] = args.constraints;
    // console.log(table, fields);
    return `不存在`;
  }
}

export function IsNotExistsRule(
  table: string,
  fields: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table, fields],
      options: validationOptions,
      validator: IsNotExistsRuleValidator,
    });
  };
}
