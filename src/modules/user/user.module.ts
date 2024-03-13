import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ],
  controllers: [UserController],
  providers: [UserService, MailService],
  exports: [UserService],
})
export class UserModule {}
