import { Injectable, NotFoundException } from '@nestjs/common';
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

const { NotFound } = exceptions;
config();

@Injectable()
export class PublicUsersService {
  constructor(
    @InjectModel(PublicUser.name)
    private publicUserModel: Model<PublicUserDocument>,
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
}
