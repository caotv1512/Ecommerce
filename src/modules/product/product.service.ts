// src/products/products.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './database/product.entity';
import { Category } from '../category/database/category.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductSize } from '../product-size/database/product-size.entity';
import { UploadService } from '../upload/upload.service';
import { Image } from '../image/database/image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly uploadService: UploadService,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadImages(fileUploadPromises: Array<{ fileName: string, file: Buffer }>): Promise<string[]> {
    return this.uploadService.uploadMultiple(fileUploadPromises);
  }

  async create(createProductDto: CreateProductDto, imageUrls: string[]): Promise<Product> {
    const { name, description, price, stock, categoryId } =
        createProductDto;
      const productDup = await this.productRepository.findOne({
        where: { name },
      });
      if (productDup) {
        throw new BadRequestException(
          `Product with name ${productDup.name} already exists`,
        );
      }
  
      const category = await this.categoryRepository.findOne({
        where: { id: +categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
    // Tạo đối tượng Product từ DTO
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;

    // Lưu sản phẩm vào cơ sở dữ liệu
    const savedProduct = await this.productRepository.save(product);

    // Tạo các đối tượng Image và lưu vào cơ sở dữ liệu
    const images = imageUrls.map(url => {
      const image = new Image();
      image.url = url;
      image.product = savedProduct;
      return image;
    });

    await this.imageRepository.save(images);

    return savedProduct;
  }

  async findAll(){
    const products = await this.productRepository.find({
      relations: ['category', 'images'],
    });
    return products.reverse().map((product) => {
      return {
        ...product,
        category: product?.category?.name,
      };
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'images'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, description, price, stock, images, categoryId } =
      updateProductDto;

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (stock) {
      product.stock = stock;
    }
    if (images) {
      product.images = [];
    }
    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      product.category = category;
    }

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
  }
}
