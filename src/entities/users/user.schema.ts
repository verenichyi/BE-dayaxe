import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { Access, AccessType } from './types/userTypes';

// @Schema({ versionKey: false, _id: false })
// class AccessDocument extends Document {
//   @Prop({ type: [String], required: false })
//   '0': 'delete';

//   @Prop({ type: [String], required: false })
//   '1': 'read';

//   @Prop({ type: [String], required: false })
//   '2': 'create';

//   @Prop({ type: [String], required: false })
//   '3': 'update';
// }

// const AccessSchema = SchemaFactory.createForClass(AccessDocument);

// @Schema({ versionKey: false, _id: false })
// class ModulesDocument extends Document {
//   @Prop({ type: [String], required: true })
//   'Users': AccessType[];

//   @Prop({ type: [String], required: true })
//   'Daycation': AccessType[];

//   @Prop({ type: [String], required: true })
//   'Hotel Passes': AccessType[];

//   @Prop({ type: [String], required: true })
//   'Moments': AccessType[];

//   @Prop({ type: [String], required: true })
//   'Promotions': AccessType[];
// }

// const ModulesSchema = SchemaFactory.createForClass(ModulesDocument);

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
          { type: String },
          { type: String },
          { type: String },
          { type: String },
        ],
      },
      Daycation: {
        type: [
          { type: String },
          { type: String },
          { type: String },
          { type: String },
        ],
      },
      'Hotel Passes': {
        type: [
          { type: String },
          { type: String },
          { type: String },
          { type: String },
        ],
      },
      Moments: {
        type: [
          { type: String },
          { type: String },
          { type: String },
          { type: String },
        ],
      },
      Promotions: {
        type: [
          { type: String },
          { type: String },
          { type: String },
          { type: String },
        ],
      },
    }),
    required: true,
  })
  access: Access;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
