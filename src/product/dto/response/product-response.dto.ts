import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';

import { ProductDto } from '@/product/dto/product.dto';
import { VariantDto } from '@/product/variant/dto/variant.dto';
import { CategoryResponseDto } from '@/product/category/dto/response/category-response.dto';

class CategoryResponsePickDto extends PickType(CategoryResponseDto, [
  'id',
  'name',
]) {}

export class ProductResponseDto {
  @ApiProperty({
    example: '1',
    description: 'Unique identifier for the product',
  })
  id: string;

  @ApiProperty({
    example: 'Cool T-Shirt',
    description: 'Name of the product',
  })
  name: string;

  @ApiProperty({
    example: 'A very cool t-shirt made from 100% cotton.',
    description: 'Description of the product',
  })
  description: string;

  @ApiProperty({
    example: 29.99,
    description: 'Actual price of the product',
  })
  price: number;

  @ApiPropertyOptional({
    example: 19.99,
    description: 'Discounted price of the product',
  })
  discountPrice: number;

  @ApiPropertyOptional({
    example: 33,
    description: 'Discount percentage of the product',
  })
  discountPercent?: number;

  @ApiPropertyOptional({
    example: 'https://example.com/thumbnail.jpg',
    description: 'Product thumbnail URL',
  })
  thumbnail?: string;

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Array of image URLs for the product',
  })
  images: string[];

  @ApiProperty({
    example: [
      { id: 'v1', size: 'M', stock: 10 },
      { id: 'v2', size: 'L', stock: 5 },
    ],
    description: 'Array of product variants with size and stock information',
  })
  variants: VariantDto[];

  @ApiProperty({
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Clothing',
    },
    description: 'Category details of the product (optional)',
  })
  category: CategoryResponsePickDto;

  @ApiProperty({
    example: true,
    description: 'Whether the product supports virtual try-on',
  })
  tryOn: boolean;

  @ApiProperty({
    example: 'active',
    description: 'Current product status',
  })
  status: 'active' | 'inactive';

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Timestamp when the product was created',
  })
  createdAt: Date;

  static fromDto(this: void, data: ProductDto): ProductResponseDto {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      discountPrice: data.discountPrice,
      discountPercent: data.discountPercent || undefined,
      thumbnail: data.thumbnail,
      images: data.images,
      variants: data.variants,
      category: data.category,
      tryOn: data.tryOn,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
