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
import { SerializedUser } from 'src/users/type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ResponseInterceptor)
  @Get('test')
  async data() {
    return 'Data';
  }
}
