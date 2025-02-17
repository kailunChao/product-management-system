import { Global, Module } from '@nestjs/common';
import { IsExistsRuleValidator } from './rules/is-exist.rule';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas/user.schema';
import { IsNotExistsRuleValidator } from './rules/is-not-exist.rule';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { Menu, MenuSchema } from '@/schemas/menu.schema';
import { SubMenu, SubMenuSchema } from '@/schemas/subMenu.schema';
import { Category, CategorySchema } from '@/schemas/category.schema';
import { SubCategory, SubCategorySchema } from '@/schemas/subCategory.schema';
import { Product, ProductSchema } from '@/schemas/product.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    MongooseModule.forFeature([{ name: SubMenu.name, schema: SubMenuSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [IsExistsRuleValidator, IsNotExistsRuleValidator],
  exports: [IsExistsRuleValidator, IsNotExistsRuleValidator],
})
export class CommonModule {}
