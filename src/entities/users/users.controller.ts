import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './types/user.entity';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
        message: 'Not Found',
      },
    },
    description: 'User was not found',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        status: 400,
        message:
          'Invalid userId. Id length must be 24 characters, and include only numbers and letters of the Latin alphabet',
        error: 'Bad Request',
      },
    },
    description: 'Invalid userId',
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findById(id);
  }

  @ApiCreatedResponse({ type: UserEntity })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        status: 400,
        message: [
          'username: username must be longer than or equal to 3 characters, username must be a string',
          'password: password must be longer than or equal to 4 characters, password should not be empty',
          'email: email must be an email',
        ],
        error: 'Bad Request',
      },
    },
    description: 'Invalid input',
  })
  @ApiConflictResponse({
    schema: {
      type: 'object',
      example: {
        status: 409,
        message: 'a user with the same name already exists',
        error: 'Conflict',
      },
    },
    description: 'Conflicting Request',
  })
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(body);
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'User was successfully deleted',
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        status: 404,
        message: 'Not Found',
      },
    },
    description: 'User was not found',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        status: 400,
        message:
          'Invalid userId. Id length must be 24 characters, and include only numbers and a-f (A-F) letters of the Latin alphabet',
        error: 'Bad Request',
      },
    },
    description: 'Invalid userId',
  })
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<UserEntity> {
    return await this.usersService.deleteUser(userId);
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'User has been  successfully updated',
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        status: 404,
        message: 'Not Found',
      },
    },
    description: 'User was not found',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        status: 400,
        message: [
          'username: username must be longer than or equal to 3 characters, username must be a string',
          'password: password must be longer than or equal to 4 characters, password should not be empty',
          'email: email must be an email',
        ],
        error: 'Bad Request',
      },
    },
    description: 'Invalid input',
  })
  @ApiConflictResponse({
    schema: {
      type: 'object',
      example: {
        status: 409,
        message: 'a user with the same mail already exists',
        error: 'Conflict',
      },
    },
    description: 'Conflicting Request',
  })
  @Put('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.updateUser(userId, updateUserDto);
  }
}
