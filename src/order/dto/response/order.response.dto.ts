import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { OrderDto } from '@/order/dto/order.dto';
import {
  OrderItem,
  OrderStatus,
  PaymentStatus,
} from '@/order/entities/order.entity';

export class OrderItemDto implements OrderItem {
  @ApiProperty()
  productId!: string;

  @ApiProperty({
    example: 'variant_12345',
  })
  variantId: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({
    example: 'SKU_12345',
  })
  sku?: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  subtotal!: number;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
  })
  metadata?: Record<string, unknown>;
}

export class OrderResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the order',
    example: 'ord_1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Order number',
    example: 'ORD-2024-0001',
  })
  orderNumber: string;

  @ApiProperty({
    type: () => ({
      id: { type: 'string' },
      name: { type: 'string', nullable: true },
      email: { type: 'string', nullable: true },
      phone: { type: 'string', nullable: true },
    }),
  })
  customer: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
  };

  @ApiProperty({ type: Date, nullable: true })
  placedAt: Date | null;

  @ApiProperty({ type: Date, nullable: true })
  updatedAt: Date | null;

  @ApiProperty({ type: Date, nullable: true })
  deliveredAt: Date | null;

  @ApiProperty({ type: Date, nullable: true })
  cancelledAt: Date | null;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  shippingCharge: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];

  @ApiPropertyOptional({ nullable: true })
  paymentMethod?: string | null;

  @ApiProperty()
  paymentStatus: PaymentStatus;

  @ApiProperty()
  orderStatus: OrderStatus;

  @ApiProperty()
  isDeleted!: boolean;

  static fromEntity(this: void, orderDto: OrderDto): OrderResponseDto {
    const dto = new OrderResponseDto();
    dto.id = orderDto.id;
    dto.orderNumber = orderDto.orderNumber;
    dto.customer = orderDto.customer;
    dto.placedAt = orderDto.placedAt;
    dto.updatedAt = orderDto.updatedAt;
    dto.deliveredAt = orderDto.deliveredAt ?? null;
    dto.cancelledAt = orderDto.cancelledAt ?? null;

    dto.subtotal = orderDto.subtotal;
    dto.shippingCharge = orderDto.shippingCharge;
    dto.discount = orderDto.discount;
    dto.total = orderDto.total;

    dto.items = orderDto.items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      name: i.name,
      sku: i.sku ?? undefined,
      price: i.price,
      quantity: i.quantity,
      subtotal: i.subtotal,
      metadata: i.metadata ?? undefined,
    }));

    dto.paymentMethod = orderDto.paymentMethod ?? null;
    dto.paymentStatus = orderDto.paymentStatus;
    dto.orderStatus = orderDto.orderStatus;

    return dto;
  }
}
