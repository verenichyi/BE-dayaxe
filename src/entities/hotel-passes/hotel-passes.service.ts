import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelPassesEntity } from './hotel-passes.entity';
import { HotelPasses, HotelPassesDocument } from './hotel-passes.schema';

@Injectable()
export class HotelPassesService {
  constructor(
    @InjectModel(HotelPasses.name)
    private hotelPassesModel: Model<HotelPassesDocument>,
  ) {}

  async getAllHotelPasses(): Promise<HotelPassesEntity[]> {
    return await this.hotelPassesModel.find();
  }
}
