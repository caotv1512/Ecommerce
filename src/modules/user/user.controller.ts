import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: CreateUserDto,
     description: 'Json structure for user object',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
   }
}
