import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(formData: any) {
    const { from, toList, subject, name, phone } = formData;

    // Đọc template EJS từ file
    const template = fs.readFileSync('./src/templates/send-mail.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template, { subject, name, phone });

    for (const to of toList) {
      const mailOptions = {
        from,
        to,
        subject,
        html, // Sử dụng HTML thay vì text
      };

      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email: ', error);
      }
    }
  }
}
