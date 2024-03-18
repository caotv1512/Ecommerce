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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async register(@Body() body: CreateUserDto) {
    console.log('body', body);
    try {
      const user = await this.authService.register(body);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }


  @Post('/login')
  @ApiConsumes('multipart/form-data')
  // @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({
    type: LoginRequestDto,
    description: 'Json structure for user object',
  })
  async login(@Body() user: LoginRequestDto) {
    try {
      const token = await this.authService.login(user);
      return token;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    console.log(req, 'google');
    
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    console.log('ahihi');
    
    res.redirect('/');
  }
}
