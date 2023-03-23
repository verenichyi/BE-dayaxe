import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { JwtPublicAuthGuard } from 'src/guards/jwt-public-auth.guard';
import responses from '../public-users/constants/public-user-api';
import { PublicUserPayloadEntity } from '../public-users/public-user-payload.entity';
import publicAuthResponses from './constants/public-auth-api';
import { LoginUserDto } from './dto/login-public-user.dto';
import { RegisterUserDto } from './dto/register-public-user.dto';
import { PublicAuthService } from './public-auth.service';

const { createUser } = responses;
const { login, UnauthorizedResponse, registration } = publicAuthResponses;

@ApiTags('Public Auth')
@Controller('public-auth')
export class PublicAuthController {
  constructor(private readonly publicAuthService: PublicAuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtPublicAuthGuard)
  @Get('/check')
  async checkAuth(@Req() request: Request & { user: PublicUserPayloadEntity }) {
    return await this.publicAuthService.checkAuth(request.user);
  }

  @HttpCode(StatusCodes.OK)
  @ApiOkResponse(login.ApiOkResponse)
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiBadRequestResponse(login.ApiBadRequestResponse)
  @Post('/login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.publicAuthService.login(loginDto);
  }

  @ApiCreatedResponse(registration.ApiCreatedResponse)
  @ApiBadRequestResponse(createUser.ApiBadRequestResponse)
  @ApiConflictResponse(createUser.ApiConflictResponse)
  @Post('/registration')
  async registration(@Body() registerDto: RegisterUserDto) {
    return await this.publicAuthService.registration(registerDto);
  }
}
