import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { PublicUsersModule } from '../public-users/public-users.module';
import { PublicAuthController } from './public-auth.controller';
import { PublicAuthService } from './public-auth.service';

config();

@Module({
  controllers: [PublicAuthController],
  providers: [PublicAuthService, JwtService],
  imports: [forwardRef(() => PublicUsersModule)],
  exports: [PublicAuthService, JwtService],
})
export class PublicAuthModule {}
