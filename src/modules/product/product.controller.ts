import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../user/user.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { Product } from './database/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductRequest } from './interfaces/creaet-request.interface';

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
    console.log(file, 'fileeeeeeeeeeeeeeeeeeeee');
    
    const fileUpload = await this.cloudinaryService.uploadFile(file);
    console.log(fileUpload, 'file');
    return;
  }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ): Promise<any> {

    const fileUpload = await this.cloudinaryService.uploadFile(file);
    console.log('============', fileUpload.url);
    
    createProductDto.imageUrl = fileUpload?.url;
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
