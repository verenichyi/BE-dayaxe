import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccessLevel } from '../types/userTypes';

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
      users: {
        delete: false,
        create: false,
        update: false,
        read: true,
      },
      daycation: {
        delete: false,
        create: true,
        update: true,
        read: true,
      },
      hotelPasses: {
        delete: false,
        create: true,
        update: true,
        read: true,
      },
    },
  })
  accessLvl: AccessLevel;
}
