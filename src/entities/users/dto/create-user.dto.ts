import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Access } from '../types/userTypes';

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
      Users: ['read', 'update'],
      Daycation: ['read', 'update'],
      'Hotel Passes': ['read', 'update'],
      Moments: ['read', 'update'],
      Promotions: ['read', 'update'],
    },
  })
  access: Access;
}
