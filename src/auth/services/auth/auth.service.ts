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
import * as SendGrid from '@sendgrid/mail';
import { Twilio } from 'twilio';

@Injectable()
export class AuthService {
  private client: Twilio;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    SendGrid.setApiKey(
      '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',
    );
    this.client = new Twilio(
      'AC9ac11e6ec46f7ed222aca075cd5d5ec0',
      '72d102528825e6fd25805d5dac7a7cfe',
    );
  }

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

  async sendWelcomeEmail(email: string, name: string) {
    const mail = {
      to: 'weisiang91@gmail.com',
      subject: 'Hello from sendgrid',
      from: 'weisiang@agmostudio.com',
      text: 'Hello',
      html: '<h1>Hello</h1>',
    };
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }

  async sendMessage(): Promise<void> {
    await this.client.messages.create({
      body: 'Hello World',
      from: '+14707982198',
      to: '+60162811714',
    });
  }
}
