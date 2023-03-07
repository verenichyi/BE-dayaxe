import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UserEntity {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
