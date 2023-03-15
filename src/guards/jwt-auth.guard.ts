import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import authExceptions from '../entities/auth/constants/exceptions';
import { UserPayloadEntity } from '../entities/users/user-payload.entity';

config();

const { Unauthorized } = authExceptions;

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(Unauthorized);
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const { _id, email, username, access } = user;
      req.user = { _id, email, username, access } as UserPayloadEntity;

      return true;
    } catch (error) {
      throw new UnauthorizedException(Unauthorized);
    }
  }
}
