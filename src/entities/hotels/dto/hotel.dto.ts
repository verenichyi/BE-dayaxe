import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HotelDto {
  @ApiProperty({
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAB4CAYAAAD',
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}
