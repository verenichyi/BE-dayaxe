import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async createUser(body: CreateUserDto): Promise<UserEntity> {
    const newUser = await new this.userModel(body);
    return newUser.save();
  }

  async deleteUser(userId: string): Promise<UserEntity> {
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException();
    }

    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException();
    }
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }
}
