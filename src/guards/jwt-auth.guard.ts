import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

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
        throw new UnauthorizedException('User is not authorized');
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      req.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('User is not authorized');
    }
  }
}
