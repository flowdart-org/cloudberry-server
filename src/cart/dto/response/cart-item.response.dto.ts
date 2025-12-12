import { ApiProperty, PickType } from '@nestjs/swagger';

import { CartItemDto } from '@/cart/dto/cart-item.dto';
import { ProductResponseDto } from '@/product/dto/response/product-response.dto';
import { ProductVariantResponseDto } from '@/product/variant/dto/response/product-variant.response.dto';

class ProductResponsePickDto extends PickType(ProductResponseDto, [
  'id',
  'name',
  'price',
  'thumbnail',
  'discountPrice',
  'discountPercent',
  'category',
]) {}

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
    type: ProductResponsePickDto,
  })
  product: ProductResponsePickDto;

  @ApiProperty({
    description: 'Details of the product variant in the cart item',
    type: ProductVariantResponseDto,
  })
  variant: ProductVariantResponseDto;

  static fromDto(item: CartItemDto): CartItemResponseDto {
    return {
      id: item.id,
      quantity: item.quantity,
      product: item.product,
      variant: item.variant,
    };
  }
}
