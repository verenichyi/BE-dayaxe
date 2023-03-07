import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  // @ApiProperty()
  // _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
