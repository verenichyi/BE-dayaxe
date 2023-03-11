import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { StatusCodes } from 'http-status-codes';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(StatusCodes.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/registration')
  async registration(@Body() registerDto: RegisterUserDto) {
    return await this.authService.registration(registerDto);
  }
}
