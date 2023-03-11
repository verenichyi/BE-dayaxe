import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Access, Modules } from './userTypes';

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
      [Modules.USERS]: ['read', 'update'],
      [Modules.DAYCATION]: ['read', 'update'],
      [Modules.HOTEL_PASSES]: ['read', 'update'],
      [Modules.MOMENTS]: ['read', 'update'],
      [Modules.PROMOTIONS]: ['read', 'update'],
    },
  })
  access: Access;
}
