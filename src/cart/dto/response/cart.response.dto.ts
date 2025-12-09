import { ApiProperty } from '@nestjs/swagger';

import { CartDto } from '@/cart/dto/cart.dto';
import { ProductDto } from '@/product/dto/product.dto';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';

export class CartResponseDto {
  @ApiProperty({
    example: 'cart_1234567890',
    description: 'Unique identifier for the cart',
  })
  id: string;

  @ApiProperty({
    example: 2,
    description: 'Total number of items in the cart',
  })
  count: number;

  @ApiProperty({
    description: 'List of items in the cart',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'item_1234567890' },
        productId: { type: 'string', example: 'prod_1234567890' },
        variantId: { type: 'string', example: 'var_1234567890' },
        quantity: { type: 'number', example: 2 },
        product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'prod_1234567890' },
            name: { type: 'string', example: 'Sample Product' },
            description: {
              type: 'string',
              example: 'This is a sample product.',
            },
            price: { type: 'number', example: 29.99 },
            thumbnail: {
              type: 'string',
              example: 'https://example.com/image.jpg',
            },
            category: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'cat_1234567890' },
                name: { type: 'string', example: 'Sample Category' },
              },
            },
          },
        },
      },
    },
  })
  items: Array<{
    id: string;
    quantity: number;
    product: Pick<ProductDto, 'id' | 'name' | 'price' | 'thumbnail'> & {
      category: Pick<ProductDto['category'], 'id' | 'name'>;
    };
    variant: Pick<ProductVariant, 'id' | 'size' | 'stock' | 'isDeleted'>;
  }>;

  static fromEntity(cart: CartDto): CartResponseDto {
    return {
      id: cart.id,
      count: cart.items.length,
      items: cart.items,
    };
  }
}
