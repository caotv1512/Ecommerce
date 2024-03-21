import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './mail.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() formData: any) {
    try {
      // Lấy dữ liệu từ biểu mẫu và cấu hình email
      const emailData = {
        ...formData,
        from: 'abc@gmail.com',
        subject: 'Khách hàng mới:',
        toList: ['caomanhct@gmail.com', 'hailongtam98@gmail.com'],
      };
      // Gửi email và chờ cho đến khi hoàn thành
      await this.emailService.sendEmail(emailData);
      // Trả về phản hồi sau khi gửi email thành công
      return 'Email sent successfully';
    } catch (error) {
      // Xử lý lỗi khi gửi email không thành công
      console.error('Error sending email: ', error);
      return 'Failed to send email';
    }
  }
}
