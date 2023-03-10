import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/test')
  async test() {
    return { token: 'mock-jwt' };
  }

  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto);
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return await this.authService.registration(userDto);
  }
}
