import { IsNotEmpty } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  // @IsNumber()
  dob: string;
}
