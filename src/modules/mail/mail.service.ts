import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import path from 'path';

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

 
        const header = fs.readFileSync('./src/templates/header.ejs', 'utf-8');
        const footer = fs.readFileSync('./src/templates/footer.ejs', 'utf-8');
        
        const template = fs.readFileSync('./src/templates/send-infor-custommer.ejs', 'utf-8');
    
        const html = ejs.render(template, { header, footer, subject, name, phone });

    for (const to of toList) {
      const mailOptions = {
        from,
        to,
        subject,
        html,
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
