import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Access, Modules } from './types/userTypes';

const moduleType = [
  { type: String, required: false },
  { type: String, required: false },
  { type: String, required: false },
  { type: String, required: false },
];

const accessRawType = {
  [Modules.USERS]: {
    type: moduleType,
    required: true,
  },
  [Modules.DAYCATION]: {
    type: moduleType,
    required: true,
  },
  [Modules.HOTEL_PASSES]: {
    type: moduleType,
    required: true,
  },
  [Modules.MOMENTS]: {
    type: moduleType,
    required: true,
  },
  [Modules.PROMOTIONS]: {
    type: moduleType,
    required: true,
  },
};

@Schema({ versionKey: false })
export class User {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({
    type: raw(accessRawType),
    required: true,
    versionKey: false,
    _id: false,
    default(): Access {
      return {
        [Modules.USERS]: ['read'],
        [Modules.DAYCATION]: ['read'],
        [Modules.HOTEL_PASSES]: ['read'],
        [Modules.MOMENTS]: ['read'],
        [Modules.PROMOTIONS]: ['read'],
      };
    },
  })
  access: Access;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
