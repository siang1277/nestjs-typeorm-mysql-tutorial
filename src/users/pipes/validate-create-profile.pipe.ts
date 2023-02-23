import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserProfileDto } from '../dto/CreateUserProfile.dto';

@Injectable()
export class ValidateCreateProfilePipe implements PipeTransform {
  transform(value: CreateUserProfileDto, metadata: ArgumentMetadata) {
    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      throw new HttpException(
        'Invalid data type for property age. Expected number',
        HttpStatus.BAD_REQUEST,
      );
    }
    value.age = parseAgeToInt;
    return value;
  }
}
