import {
  IsNumber,
  IsString,
  IsArray,
  IsBoolean,
  IsEnum,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { VariantDto } from '@/product/variant/dto/variant.dto';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'Shirt',
    description: 'Name of the product',
  })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @ApiProperty({
    example: 'A comfortable cotton shirt',
    description: 'Description of the product',
  })
  description: string;

  @IsNumber({}, { message: 'Actual price must be a number' })
  @ApiProperty({
    example: 29.99,
    description: 'Actual price of the product',
  })
  price: number;

  @IsNumber({}, { message: 'Discount percent must be a number' })
  @ApiProperty({
    example: 20,
    description: 'Discount percentage of the product',
  })
  discountPercent: number;

  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @IsArray({ message: 'Variants must be an array' })
  @ApiProperty({
    type: [VariantDto],
    example: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 5 },
    ],
    description: 'Array of product variants with size and stock',
    required: false,
  })
  variants: VariantDto[];

  @IsString({ message: 'Category ID must be a number' })
  @ApiProperty({
    example: 'cat134',
    description: 'ID of the category the product belongs to',
  })
  categoryId: string;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Status of the product',
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'], {
    message: 'Status must be either active or inactive',
  })
  status: 'active' | 'inactive';

  @IsBoolean({ message: 'TryOn must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'Whether the product supports virtual try-on',
  })
  tryOn: boolean;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  @ApiProperty({
    example: ['shirt', 'cotton', 'men'],
    description: 'Array of tags for the product',
    required: false,
  })
  tags?: string[];
}
