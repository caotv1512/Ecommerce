// update-product.dto.ts
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsArray, ArrayNotEmpty, ArrayMinSize, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  images?: UpdateImageDto[];

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateProductSizeDto)
  sizes: UpdateProductSizeDto[];
}

export class UpdateProductSizeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

class UpdateImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
