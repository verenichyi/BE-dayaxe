import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';


@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAll();
  }
}
