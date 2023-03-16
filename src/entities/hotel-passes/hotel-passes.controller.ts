import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccessGuard } from 'src/guards/access.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import authResponses from '../auth/constants/auth-api';
import { ModuleAccess } from '../users/access.decorator';
import { AccessTypes, Modules } from '../users/types/userTypes';
import responses from './constants/hotel-passes-api';
import { HotelPassesEntity } from './hotel-passes.entity';
import { HotelPassesService } from './hotel-passes.service';

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;
const {
  getAllHotelPasses,
  getHotelPassById,
  addHotelPass,
  updateHotelPass,
  deleteHotelPass,
} = responses;

@ApiTags('Hotels-Passes')
@Controller('hotel-passes')
export class HotelPassesController {
  constructor(private readonly hotelPassesService: HotelPassesService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getAllHotelPasses.ApiOkResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTEL_PASSES, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get()
  async getAllHotelPasses(): Promise<HotelPassesEntity[]> {
    return await this.hotelPassesService.getAllHotelPasses();
  }
}
