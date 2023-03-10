import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Access, Modules } from '../types/userTypes';

export class CreateUserDto {
  @ApiProperty({ example: 'Hans' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: '1234qaz' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
