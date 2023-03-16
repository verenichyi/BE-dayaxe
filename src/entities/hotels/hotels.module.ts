import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotel, HotelSchema } from './hotel.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    forwardRef(() => AuthModule),
  ],
})
export class HotelsModule {}
