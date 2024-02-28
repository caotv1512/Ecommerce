import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
// import { User } from './../user/user.entity';

@Injectable()
export class MailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'caomanhct@gmail.com', // Điền email của bạn
            pass: 'utev paws ionn tkjg', // Sử dụng mật khẩu ứng dụng ở đây
          },
        });
      }

      async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
          from: 'caomanhct@gmail.com', // Điền email của bạn
          to,
          subject,
          text,
        };
    
        try {
          await this.transporter.sendMail(mailOptions);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error sending email: ', error);
        }
      }
}
