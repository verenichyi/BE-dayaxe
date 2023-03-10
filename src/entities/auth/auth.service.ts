import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}
  async login(userDto: CreateUserDto) {}

  async registration(userDto: CreateUserDto) {}
}
