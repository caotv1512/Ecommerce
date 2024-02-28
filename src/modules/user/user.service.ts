import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(private mailService: MailService) {}
  async findAll() {
    return 'This action returns all users';
  }
  create(data: any) {
    return 'This action adds a new user';
  }

  async sendMail(user) {
    console.log(user, 'user');

    const { to, subject, text } = user;
    await this.mailService.sendEmail(to, subject, text);
  }
}
