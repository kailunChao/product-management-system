import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  introduce: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'SubMenu', default: [] }])
  subMenus: mongoose.Types.ObjectId[] | [];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
