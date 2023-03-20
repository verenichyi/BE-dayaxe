import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { RegisterUserDto } from './dto/register-public-user.dto';
import authExceptions from './constants/exceptions';
import { PublicUsersService } from '../public-users/public-users.service';
import { LoginUserDto } from './dto/login-public-user.dto';
import { PublicUserEntity } from '../public-users/public-user.entity';
import { PublicUserPayloadEntity } from '../public-users/public-user-payload.entity';

config();

const { Unauthorized } = authExceptions;

@Injectable()
export class PublicAuthService {
  constructor(
    private readonly publicUsersService: PublicUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    const { _id, email, username } = user;
    const payload = { _id, email, username };
    return this.generateToken(payload);
  }

  async registration(registerDto: RegisterUserDto) {
    const user = await this.publicUsersService.createUser(registerDto);

    const { _id, email, username } = user;
    const payload = { _id, email, username };

    return this.generateToken(payload);
  }

  private async generateToken(payload: PublicUserPayloadEntity) {
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      user: payload,
    };
  }

  async checkAuth(user: PublicUserPayloadEntity) {
    return await this.generateToken(user);
  }

  private async validateUser(userDto: LoginUserDto): Promise<PublicUserEntity> {
    const user = await this.publicUsersService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException(Unauthorized);
    }

    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(Unauthorized);
    }

    return user;
  }
}
