import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService],
})
export class ProductModule {}
