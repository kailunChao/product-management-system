import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubMenuDocument = HydratedDocument<SubMenu>;

@Schema({ timestamps: true })
export class SubMenu {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string;

  @Prop({ default: '' })
  introduce: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null })
  menuId: mongoose.Types.ObjectId | null;
}

export const SubMenuSchema = SchemaFactory.createForClass(SubMenu);
