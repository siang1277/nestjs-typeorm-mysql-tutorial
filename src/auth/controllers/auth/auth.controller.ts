import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { ResponseDto } from 'src/response/response.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/type';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseInterceptors(ResponseInterceptor)
  async signIn(
    @Body() signInDto: Record<string, any>,
  ): Promise<ResponseDto<SerializedUser>> {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  //NOTE: similar with sign in method, but the bottom is using local.auth.ts
  //NOTE: above is using auth service, both are working.
  // @UseGuards(AuthGuard('local'))
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // async signIn(@Request() request) {
  //   console.log('signIn Function');
  //   return request.user;
  // }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UseInterceptors(ResponseInterceptor)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ResponseInterceptor)
  @Get('test')
  async data() {
    return await this.authService.sendMessage();
    // return await this.authService.sendWelcomeEmail(
    //   'weisiang91@gmail.com',
    //   'Alwin',
    // );
    return 'Data';
  }
}
