import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UsersModule } from './entities/users/users.module';
import { AuthModule } from './entities/auth/auth.module';
import admin from './entities/users/constants/defaultUsersDocument';

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
          await usersCollection.insertOne(admin);
        }

        return connection;
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
