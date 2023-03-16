import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class HotelPasses {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  passType: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: Number, required: true })
  ratingPercentage: number;

  @Prop({ type: Number, required: true })
  ratingAmount: number;

  @Prop({ type: String, required: true })
  price: string;
}

export type HotelPassesDocument = HydratedDocument<HotelPasses>;
export const HotelPassesSchema = SchemaFactory.createForClass(HotelPasses);
