import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dto/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dto/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { ValidateCreateProfilePipe } from 'src/users/pipes/validate-create-profile.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  // getUsers(@Query('sortBy') sortBy: string) {
  @UseInterceptors(ResponseInterceptor)
  getUsers() {
    return this.userService.findUsers();
  }

  @Get(':id')
  @UseInterceptors(ResponseInterceptor)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Post()
  // register the validation for dto
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ResponseInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto) {
    // const { confirmPassword, ...userDetails } = createUserDto;
    // if (confirmPassword != userDetails.password) {
    // }
    return await this.userService.createUser(createUserDto);
  }

  // normally patch is used for update partially
  // put will used update whole data column
  @Patch(':id')
  //ParseIntPipe make sure the id pass in is number else will auto handle the error
  @UseInterceptors(ResponseInterceptor)
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    //if use return then no need await bcs return will make it async else use await
    await this.userService.updateUser(id, updateUserDto);
  }

  // one to one relation or one to many relation will have different delete
  @Delete('id')
  @UseInterceptors(ResponseInterceptor)
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  //apply the usePipes for the dto validation
  @UsePipes(new ValidationPipe())
  @UseInterceptors(ResponseInterceptor)
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateCreateProfilePipe) createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  @UseInterceptors(ResponseInterceptor)
  createUserPosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}
