import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PassType, ResortType } from './types/hotelPassesTypes';

@Schema({ versionKey: false })
export class HotelPasses {
  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  passType: PassType;

  @Prop({ type: String, required: true })
  resortType: ResortType;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  rating: string;

  @Prop({ type: String, required: true })
  reviewsNumber: number;

  @Prop({ type: String, required: true })
  pricePerGuest: number;
}

export type HotelPassesDocument = HydratedDocument<HotelPasses>;
export const HotelPassesSchema = SchemaFactory.createForClass(HotelPasses);
