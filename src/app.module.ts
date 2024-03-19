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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
