import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from '../users/user.entity';
import authExceptions from './constants/exceptions';
import { UserPayloadEntity } from '../users/user-payload.entity';

config();

const { Unauthorized } = authExceptions;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    const { _id, email, username, access } = user;
    const payload = { _id, email, username, access };
    return this.generateToken(payload);
  }

  async registration(registerDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      parseInt(process.env.CRYPT_SALT),
    );

    const user = await this.usersService.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    const { _id, email, username, access } = user;
    const payload = { _id, email, username, access };

    return this.generateToken(payload);
  }

  private async generateToken(payload: UserPayloadEntity) {
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      user: payload,
    };
  }

  async checkAuth(user: UserPayloadEntity) {
    return await this.generateToken(user);
  }

  private async validateUser(userDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(userDto.email);

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
