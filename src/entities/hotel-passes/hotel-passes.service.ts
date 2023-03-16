import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIdValid } from '../users/helpers/validation';
import exceptions from './constants/exceptions';
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
}
