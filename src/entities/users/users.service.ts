import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findById(userId: string): Promise<User> {
    const res = this.userModel.findById(userId);
    console.log(res);
    return res;
  }
}
