import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import config from 'ormconfig';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from './modules/category/category.module';
import { ProductSizeModule } from './modules/product-size/product-size.module';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/order-detail/order-detail.module';
import { ShippingMethodModule } from './modules/shipping-method/shipping-method.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { MessageModule } from './modules/message/message.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AddressModule } from './modules/address/address.module';
import { ReviewModule } from './modules/review/review.module';
import { ImageService } from './modules/image/image.service';
import { ImageModule } from './modules/image/image.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FilesModule } from './modules/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { BannerModule } from './modules/banner/banner.module';

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
    CategoryModule,
    ProductSizeModule,
    OrderModule,
    OrderDetailModule,
    ShippingMethodModule,
    PaymentMethodModule,
    WishlistModule,
    CouponModule,
    MessageModule,
    NotificationModule,
    AddressModule,
    ReviewModule,
    ImageModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FilesModule,
    BannerModule,
  ],
  controllers: [],
  providers: [ImageService],
})
export class AppModule {}
