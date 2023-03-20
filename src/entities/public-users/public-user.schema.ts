import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { HotelPass } from '../hotel-passes/hotel-passes.schema';

@Schema({ versionKey: false })
export class PublicUser {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({
    type: [Types.ObjectId],
    ref: HotelPass.name,
    default(): string[] {
      return [];
    },
  })
  favoriteHotelPasses: string[];
}

export type PublicUserDocument = HydratedDocument<PublicUser>;
export const PublicUserSchema = SchemaFactory.createForClass(PublicUser);
