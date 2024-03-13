import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
