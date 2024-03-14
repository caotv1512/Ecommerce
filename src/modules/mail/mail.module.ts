import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { EmailService } from './mail.service';
import { join } from 'path';
import { ContactController } from './mail.controller';

@Module({
  imports: [],
  controllers: [ContactController],
  providers: [EmailService],
  exports: [EmailService], // 👈 export for DI
})
export class MailModule {}
