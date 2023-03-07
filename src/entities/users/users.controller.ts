import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        status: 404,
        message: 'string',
        error: 'Not Found',
      },
    },
    description: 'User was not found',
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    console.log(id);
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
