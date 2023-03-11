import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AccessTypes, Modules } from './types/userTypes';
import { AccessGuard } from '../../guards/access.guard';
import { ModuleAccess } from './access.decorator';
import responses from './constants/user-api';

const { getAllUsers, getUserById, createUser, deleteUser, updateUser } =
  responses;

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse(getAllUsers.ApiOkResponse)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAll();
  }

  @ApiOkResponse(getUserById.ApiOkResponse)
  @ApiNotFoundResponse(getUserById.ApiNotFoundResponse)
  @ApiBadRequestResponse(getUserById.ApiBadRequestResponse)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findById(id);
  }

  @ApiCreatedResponse(createUser.ApiCreatedResponse)
  @ApiBadRequestResponse(createUser.ApiBadRequestResponse)
  @ApiConflictResponse(createUser.ApiConflictResponse)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Create })
  @UseGuards(AccessGuard)
  @Post()
  async createUser(
    @Body() body: CreateUserDto | RegisterUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.createUser(body);
  }

  @ApiOkResponse(deleteUser.ApiOkResponse)
  @ApiNotFoundResponse(deleteUser.ApiNotFoundResponse)
  @ApiBadRequestResponse(deleteUser.ApiBadRequestResponse)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Delete })
  @UseGuards(AccessGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<UserEntity> {
    return await this.usersService.deleteUser(userId);
  }

  @ApiOkResponse(updateUser.ApiOkResponse)
  @ApiNotFoundResponse(updateUser.ApiNotFoundResponse)
  @ApiBadRequestResponse(updateUser.ApiBadRequestResponse)
  @ApiConflictResponse(updateUser.ApiConflictResponse)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Update })
  @UseGuards(AccessGuard)
  @Put('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.updateUser(userId, updateUserDto);
  }
}
