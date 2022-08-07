import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class File extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  /* @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  userId: User | Types.ObjectId; */
}

export const FileSchema = SchemaFactory.createForClass(File);
