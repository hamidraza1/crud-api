import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';

export class AuthDto {
  //these are the class validators(Validation pipe), to validate the incoming data from client, before its business logic is handeled
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
