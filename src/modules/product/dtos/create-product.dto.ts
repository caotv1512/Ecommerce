// src/products/dto/create-product.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  price:   string;

  @IsNotEmpty()
  quantity: number | string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  categoryId: number | string;

  // @IsArray()
  // @ArrayNotEmpty()
  // @ArrayMinSize(1)
  // @ValidateNested({ each: true })
  // @Type(() => CreateProductSizeDto)
  sizes: CreateProductSizeDto[] ;
}

export class CreateProductSizeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
