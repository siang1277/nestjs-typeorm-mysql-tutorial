import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // class validator
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
  // confirmPassword: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
