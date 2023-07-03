import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  line1: string;

  line2?: string;

  @IsNotEmpty()
  postcode: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}
