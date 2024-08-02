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
  stock: number;

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
}


class UpdateImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
