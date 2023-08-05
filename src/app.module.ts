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
import { MailerModule } from '@nestjs-modules/mailer';

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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org',
        port: 587,
        auth: {
          user: `api`,
          pass: '4e034d9e-c65e9a0b',
        },
      },
      defaults: {
        from: 'weisiang@agmostudio.com',
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
