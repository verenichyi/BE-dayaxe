import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class HotelPassesEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAB4CAYAAAD',
  })
  image: string;

  @ApiProperty({
    example: 'Festive',
  })
  type: string;

  @ApiProperty({
    example: 'West Beverly Hills',
  })
  title: string;

  @ApiProperty({
    example: 'Day Pass',
  })
  passType: string;

  @ApiProperty({
    example: 'Los Angeles',
  })
  location: string;

  @ApiProperty({
    example: 'Festive',
  })
  ratingPercentage: 5;

  @ApiProperty({
    example: 'Festive',
  })
  ratingAmount: 128;

  @ApiProperty({
    example: '$25/guest',
  })
  price: string;
}
