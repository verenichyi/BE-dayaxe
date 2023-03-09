import { BadRequestException, ConflictException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDocument } from '../user.schema';

export function isIdValid(id: string): void | never {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException({
      status: 400,
      message:
        'Invalid userId. Id length must be 24 characters, and include only numbers and a-f (A-F) letters of the Latin alphabet',
      error: 'Bad Request',
    });
  }
}

export async function checkForDatabaseMatches(
  body: CreateUserDto | UpdateUserDto,
  userModel: Model<UserDocument>,
): Promise<void | never> {
  const userByName = await userModel.findOne({
    username: body.username,
  });
  if (userByName) {
    throw new ConflictException({
      status: 409,
      message: 'a user with the same name already exists',
      error: 'Conflict',
    });
  }

  const userByEmail = await userModel.findOne({ email: body.email });
  if (userByEmail) {
    throw new ConflictException({
      status: 409,
      message: 'a user with the same email already exists',
      error: 'Conflict',
    });
  }
}
