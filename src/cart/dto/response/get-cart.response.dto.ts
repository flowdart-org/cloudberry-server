import { ApiProperty } from '@nestjs/swagger';

import { Cart } from '@/cart/entities/cart.entity';

export class GetCartResponseDto {
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
    productId: string;
    variantId: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      thumbnail: string;
      category: {
        id: string;
        name: string;
      };
    };
  }>;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Timestamp when the cart was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-02T00:00:00.000Z',
    description: 'Timestamp when the cart was last updated',
  })
  updatedAt: Date;

  constructor(cart: Cart) {
    Object.assign(this, cart);
  }
}
