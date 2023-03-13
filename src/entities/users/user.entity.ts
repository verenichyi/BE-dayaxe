import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Access, Modules } from './types/userTypes';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  @Expose()
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Hans' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  @Expose()
  email: string;

  @ApiProperty({ example: '1234qaz' })
  @Exclude()
  password: string;

  @ApiProperty({
    example: {
      [Modules.USERS]: ['read', 'update'],
      [Modules.HOTELS]: ['read', 'update'],
      [Modules.DAYCATION]: ['read', 'update'],
      [Modules.HOTEL_PASSES]: ['read', 'update'],
      [Modules.MOMENTS]: ['read', 'update'],
      [Modules.PROMOTIONS]: ['read', 'update'],
    },
  })
  @Expose()
  access: Access;
}
