import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from '../users/types/user.entity';

config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginUserDto) {}

  async registration(registerDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      parseInt(process.env.CRYPT_SALT),
    );

    const user = await this.usersService.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const { _id, email, username, access } = user;
    const payload = { id: _id, email, username, access };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
