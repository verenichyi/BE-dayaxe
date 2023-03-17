import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelEntity } from './hotel.entity';
import { Hotel, HotelDocument } from './hotel.schema';
import { isIdValid } from '../users/helpers/validation';
import exceptions from './constants/exceptions';
import { HotelDto } from './dto/hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async getAllHotels(): Promise<HotelEntity[]> {
    return await this.hotelModel.find();
  }

  async getHotelById(id: string): Promise<HotelEntity> {
    isIdValid(id);

    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new NotFoundException(exceptions.NotFound);
    }

    return hotel;
  }

  async addHotel(hotelDto: HotelDto): Promise<HotelEntity> {
    const hotel = await new this.hotelModel(hotelDto);
    return hotel.save();
  }

  async updateHotel(id: string, hotelDto: HotelDto): Promise<HotelEntity> {
    isIdValid(id);
    const updatedHotel = await this.hotelModel.findByIdAndUpdate(id, hotelDto, {
      new: true,
    });

    if (!updatedHotel) {
      throw new NotFoundException(exceptions.NotFound);
    }

    return updatedHotel;
  }

  async deleteHotel(id): Promise<void> {
    isIdValid(id);

    const deletedHotel = await this.hotelModel.findByIdAndDelete(id);
    if (!deletedHotel) {
      throw new NotFoundException(exceptions.NotFound);
    }
  }
}
