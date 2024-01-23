import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from "src/constant/enum";

export class CreateUserDto {

    id: number;
    
    @ApiProperty({
       example: 'rehmat.sayani@gmail.com',
       required: true
    })
    @IsEmail()
    email: string;
    
    @ApiProperty({
       example: '1234578910',
       required: true
    })
    @IsNotEmpty()
    @MinLength(10)
    password: string;
    
    @ApiProperty({ example: "Admin|User|Guest", required: true })
    role: UserRole;
    
    }