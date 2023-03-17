import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIdValid } from '../users/helpers/validation';
import exceptions from './constants/exceptions';
import { HotelPassDto } from './dto/hotel-passes.dto';
import { HotelPass, HotelPassDocument } from './hotel-passes.schema';

@Injectable()
export class HotelPassesService {
  constructor(
    @InjectModel(HotelPass.name)
    private hotelPassModel: Model<HotelPassDocument>,
  ) {}

  async getAllHotelPasses(): Promise<HotelPass[]> {
    return await this.hotelPassModel.find();
  }

  async getHotelPassById(id: string): Promise<HotelPass> {
    isIdValid(id);

    const hotelPass = await this.hotelPassModel.findById(id);
    if (!hotelPass) {
      throw new NotFoundException(exceptions.NotFound);
    }

    return hotelPass;
  }

  async addHotelPass(hotelPassDto: HotelPassDto): Promise<HotelPass> {
    const hotelPass = await new this.hotelPassModel(hotelPassDto);
    return hotelPass.save();
  }

  async updateHotelPass(
    id: string,
    hotelPassDto: HotelPassDto,
  ): Promise<HotelPass> {
    isIdValid(id);
    const updatedHotelPass = await this.hotelPassModel.findByIdAndUpdate(
      id,
      hotelPassDto,
      {
        new: true,
      },
    );

    if (!updatedHotelPass) {
      throw new NotFoundException(exceptions.NotFound);
    }

    return updatedHotelPass;
  }

  async deleteHotelPass(id): Promise<void> {
    isIdValid(id);

    const deletedHotelPass = await this.hotelPassModel.findByIdAndDelete(id);
    if (!deletedHotelPass) {
      throw new NotFoundException(exceptions.NotFound);
    }
  }
}
