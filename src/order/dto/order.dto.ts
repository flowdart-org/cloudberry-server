import { UserDto } from '@/user/dto/user.dto';
import {
  Order,
  OrderStatus,
  PaymentStatus,
} from '@/order/entities/order.entity';
import { OrderItemDto } from '@/order/dto/order-item.dto';

export class OrderDto {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
  };

  orderStatus: OrderStatus;
  paymentMethod?: string | null;
  paymentStatus: PaymentStatus;

  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;

  items: OrderItemDto[];

  placedAt: Date;
  updatedAt: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;

  static fromEntity(entity: Order, customer: UserDto, items: OrderItemDto[]) {
    return {
      id: entity.id,
      orderNumber: entity.orderNumber,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      orderStatus: entity.orderStatus,
      paymentMethod: entity.paymentMethod,
      paymentStatus: entity.paymentStatus,
      subtotal: entity.subtotal,
      shippingCharge: entity.shippingCharge,
      discount: entity.discount,
      total: entity.total,
      items,
      placedAt: entity.placedAt,
      updatedAt: entity.updatedAt,
      deliveredAt: entity.deliveredAt,
      cancelledAt: entity.cancelledAt,
    };
  }
}
