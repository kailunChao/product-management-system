import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  userId: mongoose.Types.ObjectId | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Goods', default: null })
  itemId: mongoose.Types.ObjectId | null;

  @Prop({ required: true })
  fieldname: string;

  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  size: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
