import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ProductDto } from '@/product/dto/product.dto';

type VariantShape = { id: string; size: string; stock: number };

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
  discountPrice?: number;

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
  variants: VariantShape[];

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identifier for the category the product belongs to',
  })
  categoryId: string;

  @ApiPropertyOptional({
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Clothing',
      description: 'Apparel and garments',
    },
    description: 'Category details of the product (optional)',
  })
  category: {
    id: string;
    name: string;
    description?: string | null;
  };

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
    const dto = new ProductResponseDto();

    dto.id = data.id;
    dto.name = data.name;
    dto.description = data.description;
    dto.price = data.price;
    dto.discountPercent = data.discountPercent ?? undefined;

    // discountPrice = price * (1 - discountPercent/100)
    dto.discountPrice =
      data.discountPercent != null
        ? +(data.price * (1 - data.discountPercent / 100)).toFixed(2)
        : undefined;

    dto.images = data.images;
    dto.thumbnail = data.thumbnail ?? dto.images[0];

    dto.variants = data.variants;

    dto.categoryId = data.category?.id ?? data.categoryId;

    dto.category = data.category;

    dto.tryOn = data.tryOn;
    dto.status = data.status;
    dto.createdAt = data.createdAt;

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
      categoryId: data.categoryId,
      category: data.category,
      tryOn: data.tryOn,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
