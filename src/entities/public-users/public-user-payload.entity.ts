import { Types } from 'mongoose';

export class PublicUserPayloadEntity {
  _id: string;
  username: string;
  email: string;
  favoriteHotelPasses: string[];
}
