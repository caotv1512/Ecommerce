import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UserService } from '../user/user.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './database/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductRequest } from './interfaces/creaet-request.interface';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const fileUpload = await this.cloudinaryService.uploadFile(file);
    return;
  }

  // @Post()
  // @UseInterceptors(FilesInterceptor('images', 10)) // Giới hạn tối đa 10 ảnh
  // async createProduct(
  //   @Body() createProductDto: CreateProductDto,
  //   @UploadedFiles() images: Array<Express.Multer.File>,
  // ) {
  //   const fileUploadPromises = images.map((file) => ({
  //     fileName: `${Date.now().toString()}-${file.originalname}`,
  //     file: file.buffer,
  //   }));

  //   const imageUrls =
  //     await this.productsService.uploadImages(fileUploadPromises);

  //   return this.productsService.create(createProductDto, imageUrls);
  // }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {

    const imageUrls = createProductDto.image;

    return this.productsService.create(createProductDto, imageUrls);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
  //   try {
  //     const updatedProduct = await this.productsService.update(id, updateProductDto);
  //     return updatedProduct;
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error.message);
  //     } else if (error instanceof BadRequestException) {
  //       throw new BadRequestException(error.message);
  //     } else {
  //       throw error;
  //     }
  //   }
  // }

  // @Put(':id')
  // @UseInterceptors(FilesInterceptor('images', 10)) // Giới hạn tối đa 10 ảnh
  // async updateProduct(
  //   @Param('id') id: number,
  //   @Body() updateProductDto: CreateProductDto,
  //   @UploadedFiles() images: Array<Express.Multer.File>,
  // ) {
  //   const product = await this.productsService.findOne(id);
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${id} not found`);
  //   }

  //   let imageUrls: string[] = [];
  //   if (images && images.length > 0) {
  //     const fileUploadPromises = images.map((file) => ({
  //       fileName: `${Date.now().toString()}-${file.originalname}`,
  //       file: file.buffer,
  //     }));
  //     imageUrls = await this.productsService.uploadImages(fileUploadPromises);
  //   }
  //   const updatedProduct = await this.productsService.update(
  //     id,
  //     updateProductDto,
  //     imageUrls,
  //   );
  //   return updatedProduct;
  // }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
  ) {
    let imageUrls: string[] = updateProductDto.image
    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
      imageUrls,
    );
    return updatedProduct;
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(+id);
  }
}
