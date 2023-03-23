import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UsersModule } from './entities/users/users.module';
import { AuthModule } from './entities/auth/auth.module';
import { HotelsModule } from './entities/hotels/hotels.module';
import getDefaultUsersDocument from './entities/users/helpers/getDefaultUsersDocument';
import { HotelPassesModule } from './entities/hotel-passes/hotel-passes.module';
import { PublicAuthModule } from './entities/public-auth/public-auth.module';
import { PublicUsersModule } from './entities/public-users/public-users.module';
import hotelPasses from './entities/hotel-passes/constants/mock-data';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      connectionFactory: async (connection) => {
        const usersCollection = connection.db.collection('users');
        const usersAmount = await usersCollection.countDocuments();

        if (usersAmount === 0) {
          const document = await getDefaultUsersDocument();
          await usersCollection.insertOne(document);
        }

        const hotelPassesCollection = connection.db.collection('hotelpasses');
        const hotelPassesAmount = await hotelPassesCollection.countDocuments();

        if (hotelPassesAmount === 0) {
          await hotelPassesCollection.insertMany(hotelPasses);
        }

        return connection;
      },
    }),
    UsersModule,
    AuthModule,
    HotelsModule,
    HotelPassesModule,
    PublicAuthModule,
    PublicUsersModule,
  ],
})
export class AppModule {}
