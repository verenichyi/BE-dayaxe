import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicAuthModule } from '../public-auth/public-auth.module';
import { PublicUser, PublicUserSchema } from './public-user.schema';
import { PublicUsersController } from './public-users.controller';
import { PublicUsersService } from './public-users.service';
import { HotelPassesModule } from '../hotel-passes/hotel-passes.module';

@Module({
  controllers: [PublicUsersController],
  providers: [PublicUsersService],
  imports: [
    MongooseModule.forFeature([
      { name: PublicUser.name, schema: PublicUserSchema },
    ]),
    forwardRef(() => PublicAuthModule),
    forwardRef(() => HotelPassesModule),
  ],
  exports: [PublicUsersService],
})
export class PublicUsersModule {}
