import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
