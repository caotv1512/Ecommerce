import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { RoleGuard } from 'src/shared/guard/auth.guard';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    ) {}
  @Get()
  // @UseGuards(RoleGuard)

  findAllUsers() {
    return this.userService.findAll();
  }

  @Post(':data')
  findBy(@Body() data) {
    return this.userService.findUserBy(data);
  }

  @Post()
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
  async create(@Body() body: CreateUserDto) {
    console.log('body', body);
    try {
      const user = await this.userService.create(body);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    try {
      const updatedUser = await this.userService.update(id, userData);
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }
}
