import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { StatusCodes } from 'http-status-codes';
import responses from '../users/constants/user-api';
import authResponses from './constants/auth-api';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

const { createUser } = responses;
const { login, UnauthorizedResponse, registration } = authResponses;

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  async checkAuth() {
    return 'User is authorized';
  }

  @HttpCode(StatusCodes.OK)
  @ApiOkResponse(login.ApiOkResponse)
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiBadRequestResponse(login.ApiBadRequestResponse)
  @Post('/login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.authService.login(loginDto);
  }

  @ApiCreatedResponse(registration.ApiCreatedResponse)
  @ApiBadRequestResponse(createUser.ApiBadRequestResponse)
  @ApiConflictResponse(createUser.ApiConflictResponse)
  @Post('/registration')
  async registration(@Body() registerDto: RegisterUserDto) {
    return await this.authService.registration(registerDto);
  }
}
