import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MaxLength(300)
  message: string;
}
