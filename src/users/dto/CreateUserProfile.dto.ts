import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';

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

  // @IsNotEmptyObject()
  // added validate nested to implement the validaion inside CreateAddressDto
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
