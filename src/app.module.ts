import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/services/auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // database credential
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'password',
      database: 'nestjs_mysql_tutorial',
      entities: [User, Profile, Post],
      // auto update when entity has changed
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
