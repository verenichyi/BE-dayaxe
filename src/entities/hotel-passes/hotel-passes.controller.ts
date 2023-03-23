import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
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
import { StatusCodes } from 'http-status-codes';
import { AccessGuard } from 'src/guards/access.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import authResponses from '../auth/constants/auth-api';
import { ModuleAccess } from '../users/access.decorator';
import { AccessTypes, Modules } from '../users/types/userTypes';
import responses from './constants/hotel-passes-api';
import { HotelPassDto } from './dto/hotel-passes.dto';
import { HotelPass } from './hotel-passes.schema';
import { HotelPassesService } from './hotel-passes.service';

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;
const {
  getAllHotelPasses,
  getHotelPassById,
  addHotelPass,
  updateHotelPass,
  deleteHotelPass,
  searchHotels,
} = responses;

@ApiTags('Hotels-Passes')
@Controller('hotel-passes')
export class HotelPassesController {
  constructor(private readonly hotelPassesService: HotelPassesService) {}

  @ApiOkResponse(searchHotels.ApiOkResponse)
  @Get('/search')
  async searchHotels(
    @Query('location') location: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<HotelPass[]> {
    return await this.hotelPassesService.searchHotels(
      location,
      startDate,
      endDate,
    );
  }

  @ApiOkResponse(getAllHotelPasses.ApiOkResponse)
  @Get('/public')
  async getAllHotelsPublic(): Promise<HotelPass[]> {
    return await this.hotelPassesService.getAllHotelPasses();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getAllHotelPasses.ApiOkResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTEL_PASSES, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get()
  async getAllHotelPasses(): Promise<HotelPass[]> {
    return await this.hotelPassesService.getAllHotelPasses();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getHotelPassById.ApiOkResponse)
  @ApiNotFoundResponse(getHotelPassById.ApiNotFoundResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({ module: Modules.HOTEL_PASSES, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get(':id')
  async getHotelPassById(@Param('id') id: string): Promise<HotelPass> {
    return await this.hotelPassesService.getHotelPassById(id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiCreatedResponse(addHotelPass.ApiCreatedResponse)
  @ApiInternalServerErrorResponse(addHotelPass.ApiInternalServerErrorResponse)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({
    module: Modules.HOTEL_PASSES,
    accessType: AccessTypes.Create,
  })
  @UseGuards(AccessGuard)
  @Post()
  async addHotelPass(@Body() hotelPassDto: HotelPassDto): Promise<HotelPass> {
    return await this.hotelPassesService.addHotelPass(hotelPassDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(updateHotelPass.ApiOkResponse)
  @ApiNotFoundResponse(updateHotelPass.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(
    updateHotelPass.ApiInternalServerErrorResponse,
  )
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({
    module: Modules.HOTEL_PASSES,
    accessType: AccessTypes.Update,
  })
  @UseGuards(AccessGuard)
  @Put(':id')
  async updateHotelPass(
    @Param('id') id: string,
    @Body() hotelPassDto: HotelPassDto,
  ): Promise<HotelPass> {
    return await this.hotelPassesService.updateHotelPass(id, hotelPassDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiNoContentResponse()
  @ApiNotFoundResponse(deleteHotelPass.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(
    deleteHotelPass.ApiInternalServerErrorResponse,
  )
  @HttpCode(StatusCodes.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ModuleAccess({
    module: Modules.HOTEL_PASSES,
    accessType: AccessTypes.Delete,
  })
  @UseGuards(AccessGuard)
  @Delete(':id')
  async deleteHotelPass(@Param('id') id: string): Promise<void> {
    await this.hotelPassesService.deleteHotelPass(id);
  }
}
