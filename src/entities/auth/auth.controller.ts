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
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { StatusCodes } from 'http-status-codes';
import responses from '../users/constants/user-api';
import authResponses from './constants/auth-api';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserPayloadEntity } from '../users/user-payload.entity';

const { createUser } = responses;
const { login, UnauthorizedResponse, registration } = authResponses;

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/check')
  async checkAuth(@Req() request: Request & { user: UserPayloadEntity }) {
    return await this.authService.checkAuth(request.user);
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
