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
import { CreateProductDto, CreateProductSizeDto } from './dtos/create-product.dto';
import { UpdateProductDto, UpdateProductSizeDto } from './dtos/update-product.dto';
import { ProductSize } from '../product-size/database/product-size.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, quantity, imageUrl, categoryId, sizes } = createProductDto;

    // Kiểm tra sự tồn tại của category
    const category = await this.categoryRepository.findOne({where: {id: categoryId}});
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Tạo sản phẩm
    const product = this.productRepository.create({
      name,
      description,
      price,
      quantity,
      imageUrl,
      category,
    });

    // Tạo kích thước cho sản phẩm
    if (sizes && sizes.length > 0) {
      product.sizes = sizes.map((sizeDto: CreateProductSizeDto) => {
        const { name, price } = sizeDto;
        const size = new ProductSize();
        size.name = name;
        size.price = price;
        return size;
      });
    }

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // Cập nhật các trường thông tin cơ bản của sản phẩm
    const { name, description, price, quantity, imageUrl, categoryId, sizes } = updateProductDto;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (imageUrl) product.imageUrl = imageUrl;

    // Kiểm tra sự tồn tại của category nếu có
    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      product.category = category;
    }

    // Cập nhật kích thước của sản phẩm
    if (sizes && sizes.length > 0) {
      product.sizes = sizes.map((sizeDto: UpdateProductSizeDto) => {
        const { name, price } = sizeDto;
        const size = new ProductSize();
        size.name = name;
        size.price = price;
        return size;
      });
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
