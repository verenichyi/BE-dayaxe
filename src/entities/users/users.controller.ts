import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './types/user.entity';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAll();
  }

  @ApiOkResponse({ type: UserEntity })
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
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findById(id);
  }
}
