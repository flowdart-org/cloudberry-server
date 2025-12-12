import { ApiProperty, PickType } from '@nestjs/swagger';

import { OrderItemDto } from '@/order/dto/order-item.dto';
import { ProductResponseDto } from '@/product/dto/response/product-response.dto';
import { ProductVariantResponseDto } from '@/product/variant/dto/response/product-variant.response.dto';

class ProductVariantPickDto extends PickType(ProductVariantResponseDto, [
  'id',
  'size',
  'stock',
]) {}

class ProductPickDto extends PickType(ProductResponseDto, [
  'id',
  'name',
  'description',
  'price',
  'thumbnail',
  'category',
  'discountPrice',
  'discountPercent',
]) {}

export class OrderItemResponseDto implements OrderItemDto {
  @ApiProperty({
    type: ProductPickDto,
  })
  product: ProductPickDto;

  @ApiProperty({
    type: ProductVariantPickDto,
    description: 'Variant of the product',
  })
  variant: ProductVariantPickDto;

  @ApiProperty({
    example: 3,
    description: 'number of units of the product variant ordered',
  })
  quantity: number;

  @ApiProperty({
    example: 2046,
    description:
      'subtotal price for the product variant (quantity x unit price)',
  })
  subtotal: number;
}
