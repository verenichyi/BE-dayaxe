import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class HotelPass {
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

  @Prop({ type: String, required: true })
  ratingPercentage: string;

  @Prop({ type: String, required: true })
  ratingAmount: string;

  @Prop({ type: String, required: true })
  price: string;
}

export type HotelPassDocument = HydratedDocument<HotelPass>;
export const HotelPassSchema = SchemaFactory.createForClass(HotelPass);
