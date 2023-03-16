import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { HotelPassesController } from './hotel-passes.controller';
import { HotelPass, HotelPassSchema } from './hotel-passes.schema';
import { HotelPassesService } from './hotel-passes.service';

@Module({
  controllers: [HotelPassesController],
  providers: [HotelPassesService],
  imports: [
    MongooseModule.forFeature([
      { name: HotelPass.name, schema: HotelPassSchema },
    ]),
    AuthModule,
  ],
})
export class HotelPassesModule {}
