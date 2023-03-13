import { join } from 'node:path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { config } from 'dotenv';
import { HotelEntity } from './hotel.entity';
import { Hotel, HotelDocument } from './hotel.schema';
import { FilesService } from '../files/files.service';
import { isIdValid } from '../users/helpers/validation';
import exceptions from './constants/exceptions';

config();

const { APP_HOSTNAME, PORT } = process.env;

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    private filesService: FilesService,
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

  async addHotel(image: Express.Multer.File): Promise<HotelEntity> {
    console.log(image);
    const directory = join('images', 'hotels');
    const fileName = await this.filesService.createFile(image, directory);

    const hotel = await new this.hotelModel({
      image: join(`${APP_HOSTNAME}:${PORT}`, directory, fileName),
    });
    return hotel.save();
  }

  async updateHotel(
    id: string,
    image: Express.Multer.File,
  ): Promise<HotelEntity> {
    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new NotFoundException(exceptions.NotFound);
    }

    const imagePath = hotel.image.replace(join(`${APP_HOSTNAME}:${PORT}`), '');
    await this.filesService.deleteFile(imagePath);

    const directory = join('images', 'hotels');
    const fileName = await this.filesService.createFile(image, directory);

    const updatedHotel = await this.hotelModel.findOneAndUpdate(
      { _id: id },
      {
        image: join(`${APP_HOSTNAME}:${PORT}`, directory, fileName),
      },
      { new: true },
    );

    return updatedHotel;
  }

  async deleteHotel(id): Promise<void> {
    isIdValid(id);

    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new NotFoundException(exceptions.NotFound);
    }

    const imagePath = hotel.image.replace(join(`${APP_HOSTNAME}:${PORT}`), '');

    await this.filesService.deleteFile(imagePath);
    await this.hotelModel.findByIdAndDelete(id);
  }
}
