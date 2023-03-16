import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { HotelPassesController } from './hotel-passes.controller';
import { HotelPasses, HotelPassesSchema } from './hotel-passes.schema';
import { HotelPassesService } from './hotel-passes.service';

@Module({
  controllers: [HotelPassesController],
  providers: [HotelPassesService],
  imports: [
    MongooseModule.forFeature([
      { name: HotelPasses.name, schema: HotelPassesSchema },
    ]),
    AuthModule,
  ],
})
export class HotelPassesModule {}
