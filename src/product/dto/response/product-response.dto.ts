import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Product } from '@/product/entities/product.entity';
import { Category } from '@/product/category/entities/category.entity';

export class ProductResponseDto {
  @ApiProperty({
    example: '1',
    description: 'Unique identifier for the product',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Cool T-Shirt',
    description: 'Name of the product',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'A very cool t-shirt made from 100% cotton.',
    description: 'Description of the product',
  })
  public readonly description: string;

  @ApiProperty({
    example: 29.99,
    description: 'Actual price of the product',
  })
  public readonly price: number;

  @ApiProperty({
    example: 19.99,
    description: 'Discounted price of the product',
  })
  @ApiPropertyOptional()
  public readonly discountPrice?: number;

  @ApiProperty({
    example: 33,
    description: 'Discount percentage of the product',
  })
  @ApiPropertyOptional()
  public readonly discountPercent?: number;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: 'Discount percentage of the product',
  })
  @ApiPropertyOptional()
  public readonly thumbnail?: string;

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Array of image URLs for the product',
  })
  public readonly images: string[];

  @ApiProperty({
    example: [
      { size: 'M', stock: 10 },
      { size: 'L', stock: 5 },
    ],
    description: 'Array of product variants with size and stock information',
  })
  public readonly variants: { id: string; size: string; stock: number }[];

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identifier for the category the product belongs to',
  })
  public readonly categoryId: string;

  @ApiProperty({
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Clothing',
      description: 'Apparel and garments',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    description: 'Category details of the product',
  })
  public readonly category: Category;

  @ApiProperty({
    example: true,
    description: 'Whether the product supports virtual try-on',
  })
  tryOn: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identifier for the category the product belongs to',
  })
  public readonly status: 'active' | 'inactive';

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Timestamp when the product was created',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Timestamp when the product was last updated',
  })
  public readonly updatedAt: Date;

  constructor(
    entity: Product,
    category: Category,
    images: string[] = [],
    thumbnail?: string,
  ) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.price = entity.price;
    this.discountPercent = entity.discountPercent || undefined;
    this.discountPrice =
      (entity.price / 100) * (100 - (entity.discountPercent || 0));
    this.images = images;
    this.variants = entity.variants;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.status = entity.status;
    this.tryOn = entity.tryOn;
    this.thumbnail = thumbnail || images[0];
    if (category) {
      this.category = {
        ...entity.category,
        updatedAt: undefined,
        createdAt: undefined,
      };
    } else {
      this.categoryId = entity.category.id;
    }
  }
}
