import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HotelPassDto {
  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAB4CAYAAAD',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: 'Festive',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    example: 'West Beverly Hills',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Day Pass',
  })
  @IsNotEmpty()
  @IsString()
  passType: string;

  @ApiProperty({
    example: 'Los Angeles',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  ratingPercentage: number;

  @ApiProperty({
    example: 128,
  })
  @IsNotEmpty()
  @IsNumber()
  ratingAmount: number;

  @ApiProperty({
    example: 25,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
