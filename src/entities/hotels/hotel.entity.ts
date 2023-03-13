import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class HotelEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({ example: '' })
  image: string;
}
