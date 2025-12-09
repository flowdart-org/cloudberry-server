import { ApiProperty } from '@nestjs/swagger';

import { ProductDto } from '@/product/dto/product.dto';
import { CartItemDto } from '@/cart/dto/cart-item.dto';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';

export class CartItemResponseDto {
  @ApiProperty({
    example: 'item_1234567890',
    description: 'Unique identifier for the cart item',
  })
  id: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product in the cart item',
  })
  quantity: number;

  @ApiProperty({
    description: 'Details of the product in the cart item',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'prod_1234567890' },
      name: { type: 'string', example: 'Sample Product' },
      description: { type: 'string', example: 'This is a sample product.' },
      price: { type: 'number', example: 29.99 },
      thumbnail: { type: 'string', example: 'https://example.com/image.jpg' },
      category: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'cat_1234567890' },
          name: { type: 'string', example: 'Sample Category' },
        },
      },
      images: {
        type: 'array',
        items: { type: 'string', example: 'https://example.com/image1.jpg' },
      },
    },
  })
  product: Pick<ProductDto, 'id' | 'name' | 'price' | 'thumbnail'> & {
    category: Pick<ProductDto['category'], 'id' | 'name'>;
  };

  @ApiProperty({
    description: 'Details of the product variant in the cart item',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'var_1234567890' },
      size: { type: 'string', example: 'M' },
      stock: { type: 'number', example: 10 },
    },
  })
  variant: Pick<ProductVariant, 'id' | 'size' | 'stock' | 'isDeleted'>;

  static fromDto(item: CartItemDto): CartItemResponseDto {
    return {
      id: item.id,
      quantity: item.quantity,
      product: item.product,
      variant: item.variant,
    };
  }
}
