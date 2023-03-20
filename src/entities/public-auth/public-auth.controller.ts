import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import responses from '../public-users/constants/public-user-api';
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
