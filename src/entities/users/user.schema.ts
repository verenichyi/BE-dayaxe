import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Access, AccessTypes, Modules } from './types/userTypes';

const accessRawType = Object.values(Modules).reduce((acc, cur) => {
  acc[cur] = {
    type: [String],
    required: true,
  };

  return acc;
}, {});

const accessRawTypeDefaultValue = Object.values(Modules).reduce((acc, cur) => {
  acc[cur] = [
    AccessTypes.Create,
    AccessTypes.Read,
    AccessTypes.Update,
    AccessTypes.Delete,
  ];

  return acc;
}, {} as Access);

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
      return accessRawTypeDefaultValue;
    },
  })
  access: Access;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
