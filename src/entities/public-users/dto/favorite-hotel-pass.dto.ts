import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteHotelPassDto {
  @ApiProperty({ example: '6414344d6b0292da388a99fd' })
  @IsString()
  @IsNotEmpty()
  hotelPassId: string;
}
