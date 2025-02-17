import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  introduce: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  categoryId: mongoose.Types.ObjectId | null;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
