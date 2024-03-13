import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import config from 'ormconfig';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MulterModule.register({
      dest: './uploads', // Đường dẫn tới thư mục lưu trữ file tải lên
    }),
    ProductModule,
    UserModule,
    CloudinaryModule,
    MailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
