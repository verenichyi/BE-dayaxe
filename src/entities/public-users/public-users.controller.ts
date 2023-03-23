import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreatePublicUserDto } from './dto/create-public-user.dto';
import responses from './constants/public-user-api';
import { PublicUsersService } from './public-users.service';
import { PublicUserEntity } from './public-user.entity';
import { PublicUserInterceptor } from 'src/interceptors/public-user.interceptor';
import { FavoriteHotelPassDto } from './dto/favorite-hotel-pass.dto';

const { getAllUsers, getUserById, createUser, favoriteHotelPasses } = responses;

@ApiTags('Public Users')
@UseInterceptors(PublicUserInterceptor)
@Controller('public-users')
export class PublicUsersController {
  constructor(private readonly usersService: PublicUsersService) {}

  @ApiOkResponse(getAllUsers.ApiOkResponse)
  @Get()
  async getAllUsers(): Promise<PublicUserEntity[]> {
    return await this.usersService.getAll();
  }

  @ApiOkResponse(getUserById.ApiOkResponse)
  @ApiNotFoundResponse(getUserById.ApiNotFoundResponse)
  @ApiBadRequestResponse(getUserById.ApiBadRequestResponse)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<PublicUserEntity> {
    return await this.usersService.findById(id);
  }

  @ApiCreatedResponse(createUser.ApiCreatedResponse)
  @ApiBadRequestResponse(createUser.ApiBadRequestResponse)
  @ApiConflictResponse(createUser.ApiConflictResponse)
  @Post()
  async createUser(
    @Body() body: CreatePublicUserDto,
  ): Promise<PublicUserEntity> {
    return await this.usersService.createUser(body);
  }

  @ApiCreatedResponse(favoriteHotelPasses.ApiOkResponse)
  @ApiNotFoundResponse(favoriteHotelPasses.ApiNotFoundResponse)
  @ApiBadRequestResponse(favoriteHotelPasses.ApiBadRequestResponse)
  @ApiUnprocessableEntityResponse(
    favoriteHotelPasses.ApiUnprocessableEntityResponse,
  )
  @Patch('favorite-hotel-pass/:userId/add')
  async addHotelPassToFavorites(
    @Param('userId') userId: string,
    @Body() body: FavoriteHotelPassDto,
  ): Promise<PublicUserEntity> {
    return await this.usersService.addHotelPassToFavorites(
      userId,
      body.hotelPassId,
    );
  }

  @ApiCreatedResponse(favoriteHotelPasses.ApiOkResponse)
  @ApiNotFoundResponse(favoriteHotelPasses.ApiNotFoundResponse)
  @ApiBadRequestResponse(favoriteHotelPasses.ApiBadRequestResponse)
  @ApiUnprocessableEntityResponse(
    favoriteHotelPasses.ApiUnprocessableEntityResponse,
  )
  @Patch('favorite-hotel-pass/:userId/delete')
  async deleteHotelPassFomFavorites(
    @Param('userId') userId: string,
    @Body() body: FavoriteHotelPassDto,
  ): Promise<PublicUserEntity> {
    return await this.usersService.deleteHotelPassFomFavorites(
      userId,
      body.hotelPassId,
    );
  }
}
