import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class HotelEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({
    example:
      'http:\\localhost:4000\\images\\hotels\\84474a34-f0f6-40d8-a2fe-b976872685a9.png',
  })
  image: string;
}
