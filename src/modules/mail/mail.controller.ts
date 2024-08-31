import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Mail')
@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() formData: any) {
    try {
      const emailData = {
        ...formData,
        from: 'abc@gmail.com',
        subject: 'Khách hàng mới:',
        toList: ['caomanhct@gmail.com', 'Info.amt247@gmail.com'],
      };
      await this.emailService.sendEmail(emailData);
      return 'Email sent successfully';
    } catch (error) {
      console.error('Error sending email: ', error);
      return 'Failed to send email';
    }
  }
}
