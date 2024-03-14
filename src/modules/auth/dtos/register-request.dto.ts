import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123@123a',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
