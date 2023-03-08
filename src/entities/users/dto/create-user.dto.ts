import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Hans' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: '1234qaz' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
