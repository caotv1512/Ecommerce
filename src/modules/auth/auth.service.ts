import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/database/user.entity';
import { AccessToken } from '../../shared/types/auth.type';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dtos/register-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { SecureUtils } from 'src/shared/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserRegister(user: CreateUserDto) {
    const { email, username, phone, password } = user;
    const exitEmail = await this.userRepository.findOne({ where: { email } });
    if (exitEmail) {
      throw new BadRequestException('Email already exists');
    }
    const exitUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (exitUsername) {
      throw new BadRequestException('Username already exists');
    }
    const exitPhonNumber = await this.userRepository.findOne({
      where: { phone },
    });
    if (exitPhonNumber) {
      throw new BadRequestException('Phone already exists');
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }
    // const isMatch: boolean = bcrypt.compareSync(password, user.password);
    // if (!isMatch) {
    //   throw new BadRequestException('Password does not match');
    // }
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(email, password, "ahihii");
    
    const passport = await SecureUtils.comparePasswords(
      password,
      user.password,
    );
    console.log(passport, 'passport');

    if (user && (await SecureUtils.comparePasswords(password, user.password))) {
      return user;
    }
    return null;
  }
async login(user: LoginRequestDto): Promise<AccessToken> {
  const { email, password } = user;
  const validatedUser = await this.validateUser(email, password);
  
  if (validatedUser) {
    const payload = { email: validatedUser.email, id: validatedUser.id, role: validatedUser.role };
    const access_token = await this.jwtService.sign(payload);
    console.log(access_token, 'access_token');
    return { access_token };
  } else {
    throw new UnauthorizedException('Invalid username or password');
  }
}
  async register(user: CreateUserDto): Promise<any> {
    try {
      const newUser = await this.validateUserRegister(user);
      const hashedPassword = await SecureUtils.hashPassword(user.password);
      newUser.password = hashedPassword;
      await this.usersService.create(newUser);
      return {
        message: 'User created successfully',
        data: newUser,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
