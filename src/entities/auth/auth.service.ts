import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    return this.generateToken(user);
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

    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const { _id, email, username, access } = user;
    const payload = { id: _id, email, username, access };

    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
    };
  }

  private async validateUser(userDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!user && !isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
