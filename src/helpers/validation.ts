import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export function isIdValid(id) {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException({
      status: 400,
      message:
        'Invalid userId. Id length must be 24 characters, and include only numbers and letters of the Latin alphabet',
      error: 'Bad Request',
    });
  }
}
