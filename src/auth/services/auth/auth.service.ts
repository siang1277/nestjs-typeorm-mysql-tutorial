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
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
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

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      // from: 'weisiangdrive1@gmail.com',
      subject: 'Welcome to our app!',
      text: `<p>Hello ${name},\n\nThank you for joining our app!\n\nBest regards,\nYour App Team</p>`,
    });
  }

  // async sendWelcomeEmail(email: string, name: string) {
  //   const mailOptions = {
  //     from: `SON <wesiang@agmostudio.com>`,
  //     to: 'weisiang91@gmail.com',
  //     subject: 'Welcome to our app!',
  //     text: `<p>Hello ${name},\n\nThank you for joining our app!\n\nBest regards,\nYour App Team</p>`,
  //   };
  //   // if (mail.template) {
  //   //   const emailTemplateSource = fs.readFileSync(
  //   //     path.join(__dirname, `../../templates/${mail.template}.hbs`),
  //   //     'utf8',
  //   //   );
  //   //   const template = handlebars.compile(emailTemplateSource);
  //   //   const htmlToSend = template(mail.templateVariables);
  //   //   mailOptions.html = htmlToSend;
  //   // } else {
  //   //   mailOptions.text = mail.text;
  //   // }
  //   try {
  //     const body = Object.keys(mailOptions)
  //       .map((key, index) => `${key}=${encodeURIComponent(mailOptions[key])}`)
  //       .join('&');
  //     const response = await axios.post(
  //       `https://api.mailgun.net/v3/smtp.mailgun.org/messages`,
  //       body,
  //       {
  //         auth: {
  //           username: 'api',
  //           password: '4e034d9e-c65e9a0b',
  //         },
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       },
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
