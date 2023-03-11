import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  MODULE_ACCESS_TYPE_KEY,
  ModuleAccessType,
} from '../entities/users/access.decorator';
import { config } from 'dotenv';

config();

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredModuleAccessType =
      this.reflector.getAllAndOverride<ModuleAccessType>(
        MODULE_ACCESS_TYPE_KEY,
        [context.getHandler(), context.getClass()],
      );

    if (!requiredModuleAccessType) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const user = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    req.user = user;

    const { module, accessType } = requiredModuleAccessType;

    if (!user.access[module]) {
      return false;
    }

    return user.access[module].includes(accessType);
  }
}
