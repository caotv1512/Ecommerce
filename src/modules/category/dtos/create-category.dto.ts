import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateCategoryDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
 