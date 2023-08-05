import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SerializedUser } from 'src/users/type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) return null;
    const passwordValid = password == user.password;
    if (!user) {
      throw new NotAcceptableException();
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotAcceptableException('User not found');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { username: user.username, password: user.password };
    const serializedUser = new SerializedUser(user);
    serializedUser.access_token = await this.jwtService.signAsync(payload);
    return serializedUser;
  }
}
