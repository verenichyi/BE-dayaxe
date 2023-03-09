import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Access } from './types/userTypes';

@Schema({ versionKey: false })
export class User {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({
    type: raw({
      Users: {
        type: [
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
        ],
        required: true,
      },
      Daycation: {
        type: [
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
        ],
        required: true,
      },
      'Hotel Passes': {
        type: [
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
        ],
        required: true,
      },
      Moments: {
        type: [
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
        ],
        required: true,
      },
      Promotions: {
        type: [
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
          { type: String, required: false },
        ],
        required: true,
      },
    }),
    required: true,
    versionKey: false,
  })
  access: Access;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
