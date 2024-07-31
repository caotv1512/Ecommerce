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
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number ;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => CreateImageDto)
  images: CreateImageDto[];
  imageUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;

  // @ApiProperty()
  // @IsArray()
  // @ArrayNotEmpty()
  // @ArrayMinSize(1)
  // @ValidateNested({ each: true })
  // @Type(() => CreateProductSizeDto)
  // sizes: CreateProductSizeDto[];
}

// export class CreateProductSizeDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   price: number;
// }

class CreateImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
