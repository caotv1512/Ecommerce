import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAllUsers() {
    console.log('hello');

    return this.userService.findAll();
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Post('send-mail')
  async sendMail(@Body() sendMailDto) {
    console.log(sendMailDto, 'sendMailDto');
    // const { to, subject, text } = sendMailDto;

    await this.userService.sendMail(sendMailDto);
  }
}
