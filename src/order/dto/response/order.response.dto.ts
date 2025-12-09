import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { OrderDto } from '@/order/dto/order.dto';
import { OrderItemDto } from '@/order/dto/order-item.dto';
import { OrderStatus, PaymentStatus } from '@/order/entities/order.entity';

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
  isDeleted: boolean;

  static fromEntity(this: void, orderDto: OrderDto): OrderResponseDto {
    return {
      id: orderDto.id,
      orderNumber: orderDto.orderNumber,
      customer: orderDto.customer,
      placedAt: orderDto.placedAt,
      updatedAt: orderDto.updatedAt,
      deliveredAt: orderDto.deliveredAt ?? null,
      cancelledAt: orderDto.cancelledAt ?? null,
      subtotal: orderDto.subtotal,
      shippingCharge: orderDto.shippingCharge,
      discount: orderDto.discount,
      total: orderDto.total,
      items: orderDto.items,
      paymentMethod: orderDto.paymentMethod ?? null,
      paymentStatus: orderDto.paymentStatus,
      orderStatus: orderDto.orderStatus,
      isDeleted: false,
    };
  }
}
