import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import {
  checkUserForDatabaseMatches,
  isIdValid,
} from 'src/entities/users/helpers/validation';

import { RegisterUserDto } from '../auth/dto/register-user.dto';
import exceptions from './constants/exceptions';
import { CreatePublicUserDto } from './dto/create-public-user.dto';
import { PublicUserEntity } from './public-user.entity';
import { PublicUser, PublicUserDocument } from './public-user.schema';
import { HotelPassesService } from '../hotel-passes/hotel-passes.service';

const { NotFound, UnprocessableEntity } = exceptions;
config();

@Injectable()
export class PublicUsersService {
  constructor(
    @InjectModel(PublicUser.name)
    private publicUserModel: Model<PublicUserDocument>,
    private hotelPassesService: HotelPassesService,
  ) {}

  async getAll(): Promise<PublicUserEntity[]> {
    return await this.publicUserModel.find();
  }

  async findById(userId: string): Promise<PublicUserEntity> {
    isIdValid(userId);

    const user = await this.publicUserModel.findById(userId);
    if (!user) {
      throw new NotFoundException(NotFound);
    }
    return user;
  }

  async createUser(
    body: CreatePublicUserDto | RegisterUserDto,
  ): Promise<PublicUserEntity> {
    await checkUserForDatabaseMatches(
      body.username,
      body.email,
      this.publicUserModel,
    );

    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(process.env.CRYPT_SALT),
    );

    const newUser = await new this.publicUserModel({
      ...body,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async getUserByEmail(email: string): Promise<PublicUserEntity> {
    return await this.publicUserModel.findOne({ email });
  }

  async addHotelPassToFavorites(
    userId: string,
    hotelPassId: string,
  ): Promise<PublicUserEntity> {
    isIdValid(userId);
    isIdValid(hotelPassId);

    const user = await this.publicUserModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException(NotFound);
    }

    const hotelPass = await this.hotelPassesService.getHotelPassById(
      hotelPassId,
    );
    if (!hotelPass) {
      throw new UnprocessableEntityException(UnprocessableEntity);
    }

    user.favoriteHotelPasses.push(hotelPassId);

    return user.save();
  }

  async deleteHotelPassFomFavorites(
    userId: string,
    hotelPassId: string,
  ): Promise<PublicUserEntity> {
    isIdValid(userId);
    isIdValid(hotelPassId);

    const user = await this.publicUserModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException(NotFound);
    }

    const hotelPass = await this.hotelPassesService.getHotelPassById(
      hotelPassId,
    );
    if (!hotelPass) {
      throw new UnprocessableEntityException(UnprocessableEntity);
    }

    return await this.publicUserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { favoriteHotelPasses: hotelPassId } },
      { new: true },
    );
  }
}
