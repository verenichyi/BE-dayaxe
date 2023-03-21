import { Types } from 'mongoose';

export class PublicUserPayloadEntity {
  _id: Types.ObjectId;
  username: string;
  email: string;
  favoriteHotelPasses: string[];
}
