import { OrderDto } from '@/order/dto/order.dto';
import { OrderItem } from '@/order/entities/order.entity';

export class OrderItemDto implements OrderItem {
  productId!: string;
  variantId?: string | null;
  name!: string;
  sku?: string | null;
  price!: number;
  quantity!: number;
  subtotal!: number;
  metadata?: Record<string, unknown> | null;
}

export class OrderResponseDto {
  id!: string;
  orderNumber!: string;
  customer: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  placedAt!: Date;
  updatedAt!: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;

  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;

  items: OrderItemDto[];

  paymentMethod?: string | null;
  paymentStatus!: string;
  orderStatus!: string;

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
      variantId: i.variantId ?? null,
      name: i.name,
      sku: i.sku ?? null,
      price: i.price,
      quantity: i.quantity,
      subtotal: i.subtotal,
      metadata: i.metadata ?? null,
    }));

    dto.paymentMethod = orderDto.paymentMethod ?? null;
    dto.paymentStatus = orderDto.paymentStatus;
    dto.orderStatus = orderDto.orderStatus;

    return dto;
  }
}
