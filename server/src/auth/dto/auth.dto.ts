import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}

export class AuthRegisterDto extends AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  linkedInUrl: string;
}
