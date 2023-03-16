import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HotelEntity } from './hotel.entity';
import { HotelsService } from './hotels.service';
import { StatusCodes } from 'http-status-codes';
import { AccessGuard } from '../../guards/access.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ModuleAccess } from '../users/access.decorator';
import { AccessTypes, Modules } from '../users/types/userTypes';
import authResponses from '../auth/constants/auth-api';
import responses from './constants/hotels-api';
import { HotelDto } from './dto/hotel.dto';

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;
const { getAllHotels, getHotelById, addHotel, updateHotel, deleteHotel } =
  responses;

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiOkResponse(getAllHotels.ApiOkResponse)
  @Get('/public')
  async getAllHotelsPublic(): Promise<HotelEntity[]> {
    return await this.hotelsService.getAllHotels();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getAllHotels.ApiOkResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTELS, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get()
  async getAllHotels(): Promise<HotelEntity[]> {
    return await this.hotelsService.getAllHotels();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getHotelById.ApiOkResponse)
  @ApiNotFoundResponse(getHotelById.ApiNotFoundResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTELS, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get(':id')
  async getHotelById(@Param('id') id: string): Promise<HotelEntity> {
    return await this.hotelsService.getHotelById(id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiCreatedResponse(addHotel.ApiCreatedResponse)
  @ApiInternalServerErrorResponse(addHotel.ApiInternalServerErrorResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTELS, accessType: AccessTypes.Create })
  @UseGuards(AccessGuard)
  @Post()
  async addHotel(@Body() hotelDto: HotelDto): Promise<HotelEntity> {
    return await this.hotelsService.addHotel(hotelDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(updateHotel.ApiOkResponse)
  @ApiNotFoundResponse(updateHotel.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(updateHotel.ApiInternalServerErrorResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTELS, accessType: AccessTypes.Update })
  @UseGuards(AccessGuard)
  @Put(':id')
  async updateHotel(
    @Param('id') id: string,
    @Body() hotelDto: HotelDto,
  ): Promise<HotelEntity> {
    return await this.hotelsService.updateHotel(id, hotelDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiNoContentResponse()
  @ApiNotFoundResponse(deleteHotel.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(deleteHotel.ApiInternalServerErrorResponse)
  @HttpCode(StatusCodes.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTELS, accessType: AccessTypes.Delete })
  @UseGuards(AccessGuard)
  @Delete(':id')
  async deleteHotel(@Param('id') id: string): Promise<void> {
    await this.hotelsService.deleteHotel(id);
  }
}
