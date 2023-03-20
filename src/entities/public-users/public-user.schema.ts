import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class PublicUser {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  email: string;
}

export type PublicUserDocument = HydratedDocument<PublicUser>;
export const PublicUserSchema = SchemaFactory.createForClass(PublicUser);
