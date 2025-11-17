import { ApiProperty } from '@nestjs/swagger';

import { CartWithItems } from '@/common/types/cart';
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
  items: {
    id: string;
    quantity: number;
    product: Pick<
      ProductDto,
      'description' | 'id' | 'name' | 'price' | 'thumbnail' | 'images'
    > & {
      category: Pick<ProductDto['category'], 'id' | 'name'>;
    };
    variant: Pick<ProductVariant, 'id' | 'size' | 'stock'>;
  }[];

  static fromEntity(cart: CartWithItems): CartResponseDto {
    const dto = new CartResponseDto();

    dto.id = cart.id;
    dto.count = cart.items.length;

    dto.items = cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        thumbnail: item.product.thumbnail,
        category: {
          id: item.product.category.id,
          name: item.product.category.name,
        },
        images: item.product.images,
      },
      variant: {
        id: item.variant.id,
        size: item.variant.size,
        stock: item.variant.stock,
      },
    }));

    return dto;
  }
}
