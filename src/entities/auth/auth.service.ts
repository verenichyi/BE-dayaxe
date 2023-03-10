import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}
  async login(loginDto: LoginUserDto) {}

  async registration(userDto: CreateUserDto) {}
}
