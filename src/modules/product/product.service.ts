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
import {
  CreateProductDto,
  CreateProductSizeDto,
} from './dtos/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductSizeDto,
} from './dtos/update-product.dto';
import { ProductSize } from '../product-size/database/product-size.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, quantity, imageUrl, categoryId, sizes } =
      createProductDto;
    const productDup = await this.productRepository.findOne({
      where: { name },
    });
    if (productDup) {
      throw new BadRequestException(
        `Product with name ${createProductDto.name} already exists`,
      );
    }

    // Kiểm tra sự tồn tại của category+
    const category = await this.categoryRepository.findOne({
      where: { id: +categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const newProduct = {
      name: name,
      description: description,
      price: +price,
      quantity: +quantity,
      imageUrl: imageUrl,
      category: category,
    };

    // Tạo sản phẩm
    const product = this.productRepository.create(newProduct);

    // Tạo kích thước cho sản phẩm
    function convertArray(input): CreateProductSizeDto[] {
      const output: CreateProductSizeDto[] = [];
      for (const jsonString of input) {
        try {
          const item: CreateProductSizeDto = JSON.parse(jsonString);
          output.push(item);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
      return output;
    }
    const sizeList = convertArray(sizes);
    const savedProduct = await this.productRepository.save(product);

    if (sizeList && sizeList.length > 0) {
      const productSizes = await Promise.all(
        sizeList.map(async (sizeDto: CreateProductSizeDto) => {
          const { name, price } = sizeDto;
          const productSize = this.productSizeRepository.create({
            name,
            price: +price,
            product, // Gán sản phẩm cho kích thước
          });

          return await this.productSizeRepository.save(productSize);
        }),
      );
      savedProduct.sizes = productSizes;
    }

    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category', 'sizes', 'images'],
    });
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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, description, price, quantity, images, categoryId, sizes } =
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
    if (quantity) {
      product.quantity = quantity;
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

    if (sizes && sizes.length > 0) {
      const productSizes = await Promise.all(
        sizes.map(async (sizeDto) => {
          const { name, price } = sizeDto;
          let productSize = await this.productSizeRepository.findOne({
            where: { product, name },
          });
          if (!productSize) {
            productSize = new ProductSize();
            productSize.name = name;
            productSize.price = price;
            productSize.product = product;
            await this.productSizeRepository.save(productSize);
          } else {
            productSize.price = price;
            await this.productSizeRepository.save(productSize);
          }
          return productSize;
        }),
      );
      product.sizes = productSizes;
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
