import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dto/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dto/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    // const { confirmPassword, ...userDetails } = createUserDto;
    // if (confirmPassword != userDetails.password) {
    // }
    return this.userService.createUser(createUserDto);
  }

  // normally patch is used for update partially
  // put will used update whole data column
  @Patch(':id')
  //ParseIntPipe make sure the id pass in is number else will auto handle the error
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    //if use return then no need await bcs return will make it async else use await
    await this.userService.updateUser(id, updateUserDto);
  }

  // one to one relation or one to many relation will have different delete
  @Delete('id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}
