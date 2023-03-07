import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './types/user.entity';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userModel.find();
  }

  async findById(userId: string): Promise<UserEntity> {
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException();
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
