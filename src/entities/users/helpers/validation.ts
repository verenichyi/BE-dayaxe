import { BadRequestException, ConflictException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDocument } from '../user.schema';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';
import exceptions from '../constants/exceptions';

const { InvalidIdBadRequest, Conflict } = exceptions;

export function isIdValid(id: string): void | never {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException(InvalidIdBadRequest);
  }
}

export async function checkNewUserForDatabaseMatches(
  body: CreateUserDto | UpdateUserDto | RegisterUserDto,
  userModel: Model<UserDocument>,
): Promise<void | never> {
  const userByName = await userModel.findOne({
    username: body.username,
  });
  if (userByName) {
    throw new ConflictException(Conflict);
  }

  const userByEmail = await userModel.findOne({ email: body.email });
  if (userByEmail) {
    throw new ConflictException(Conflict);
  }
}

export async function checkUpdatedUserForDatabaseMatches(
  body: CreateUserDto | UpdateUserDto,
  userModel: Model<UserDocument>,
  userId: string,
): Promise<void | never> {
  const userByName = await userModel.findOne({
    username: body.username,
  });
  if (userByName && userByName._id.toString() !== userId) {
    throw new ConflictException(Conflict);
  }

  const userByEmail = await userModel.findOne({ email: body.email });
  if (userByEmail && userByEmail._id.toString() !== userId) {
    throw new ConflictException(Conflict);
  }
}
