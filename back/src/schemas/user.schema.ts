import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  // @Prop({ default: null })
  // avatar: string | null;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  realname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  enable: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null })
  role: mongoose.Types.ObjectId | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
