import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { AuthService } from './auth.service';
  import { UserService } from '../user/user.service';
  import { CreateUserDto } from '../user/dtos/create-user.dto';
  import { LoginRequestDto } from './dtos/register-request.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { AuthGuard } from '@nestjs/passport';
  import { Request, Response } from 'express';
  
  @ApiTags('Google')
  @Controller('')
  export class GoogleController {
    constructor(
    ) {}
  
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
      console.log(req.user,'mammaaa');
    //   console.log(res,'ahii'); 
      res.redirect('/');
    }
  }
  