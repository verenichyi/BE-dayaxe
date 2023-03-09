import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Access } from './userTypes';

export class UserEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Hans' })
  username: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  email: string;

  @ApiProperty({ example: '1234qaz' })
  password: string;

  @ApiProperty({
    example: {
      Users: ['read', 'update'],
      Daycation: ['read', 'update'],
      'Hotel Passes': ['read', 'update'],
      Moments: ['read', 'update'],
      Promotions: ['read', 'update'],
    },
  })
  access: Access;
}
