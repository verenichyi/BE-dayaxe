import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { HotelEntity } from './hotel.entity';
import { HotelsService } from './hotels.service';
import { StatusCodes } from 'http-status-codes';
import { AccessGuard } from '../../guards/access.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ModuleAccess } from '../users/access.decorator';
import { AccessTypes, Modules } from '../users/types/userTypes';
import authResponses from '../auth/constants/auth-api';
import responses from './constants/hotels-api';

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;
const { getAllHotels, getHotelById, addHotel, updateHotel, deleteHotel } =
  responses;

@ApiTags('Hotels')
@ApiBearerAuth()
@ApiUnauthorizedResponse(UnauthorizedResponse)
@ApiForbiddenResponse(ForbiddenResponse)
@UseGuards(JwtAuthGuard)
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiOkResponse(getAllHotels.ApiOkResponse)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get()
  async getAllHotels(): Promise<HotelEntity[]> {
    return await this.hotelsService.getAllHotels();
  }

  @ApiOkResponse(getHotelById.ApiOkResponse)
  @ApiNotFoundResponse(getHotelById.ApiNotFoundResponse)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Read })
  @UseGuards(AccessGuard)
  @Get(':id')
  async getHotelById(@Param('id') id: string): Promise<HotelEntity> {
    return await this.hotelsService.getHotelById(id);
  }

  @ApiCreatedResponse(addHotel.ApiCreatedResponse)
  @ApiInternalServerErrorResponse(addHotel.ApiInternalServerErrorResponse)
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'image' })
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Create })
  @UseGuards(AccessGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async addHotel(
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<HotelEntity> {
    return await this.hotelsService.addHotel(image);
  }

  @ApiOkResponse(updateHotel.ApiOkResponse)
  @ApiNotFoundResponse(updateHotel.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(updateHotel.ApiInternalServerErrorResponse)
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'image' })
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Update })
  @UseGuards(AccessGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateHotel(
    @Param('id') id: string,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<HotelEntity> {
    return await this.hotelsService.updateHotel(id, image);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse(deleteHotel.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(deleteHotel.ApiInternalServerErrorResponse)
  @HttpCode(StatusCodes.NO_CONTENT)
  @ModuleAccess({ module: Modules.USERS, accessType: AccessTypes.Delete })
  @UseGuards(AccessGuard)
  @Delete(':id')
  async deleteHotel(@Param('id') id: string): Promise<void> {
    await this.hotelsService.deleteHotel(id);
  }
}
