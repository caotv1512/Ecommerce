import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './database/product.entity';
import { Category } from '../category/database/category.entity';
import { ProductSize } from '../product-size/database/product-size.entity';
import { UploadService } from '../upload/upload.service';
import { Image } from '../image/database/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Image])],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService, UploadService],
})
export class ProductModule {}
