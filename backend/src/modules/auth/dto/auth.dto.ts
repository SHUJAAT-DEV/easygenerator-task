import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}

export class SignUpDto extends PartialType(SignInDto) {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
