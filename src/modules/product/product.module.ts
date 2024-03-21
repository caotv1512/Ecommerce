import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './database/product.entity';
import { Category } from '../category/database/category.entity';
import { ProductSize } from '../product-size/database/product-size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductSize])],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService],
})
export class ProductModule {}
