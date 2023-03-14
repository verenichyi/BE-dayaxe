import { Types } from 'mongoose';
import { Access } from './types/userTypes';

export class UserPayloadEntity {
  _id: Types.ObjectId;
  username: string;
  email: string;
  access: Access;
}
