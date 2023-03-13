import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import authResponses from '../auth/constants/auth-api';
import { HotelEntity } from './hotel.entity';
import { HotelsService } from './hotels.service';
import { StatusCodes } from 'http-status-codes';

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;

@ApiTags('Hotels')
@ApiUnauthorizedResponse(UnauthorizedResponse)
@ApiForbiddenResponse(ForbiddenResponse)
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async getAllHotels(): Promise<HotelEntity[]> {
    return await this.hotelsService.getAllHotels();
  }

  @Get(':id')
  async getHotelById(@Param('id') id: string): Promise<HotelEntity> {
    return await this.hotelsService.getHotelById(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async addHotel(
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<HotelEntity> {
    return await this.hotelsService.addHotel(image);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateHotel(
    @Param('id') id: string,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<HotelEntity> {
    return await this.hotelsService.updateHotel(id, image);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  async deleteHotel(@Param('id') id: string): Promise<void> {
    await this.hotelsService.deleteHotel(id);
  }
}
