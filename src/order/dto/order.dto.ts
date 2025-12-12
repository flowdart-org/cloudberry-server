import {
  Order,
  OrderStatus,
  PaymentStatus,
} from '@/order/entities/order.entity';
import { UserDto } from '@/user/dto/user.dto';
import { OrderItemDto } from '@/order/dto/order-item.dto';
import { Address } from '@/user/entities/address.entity';

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

  shippingAddress: Pick<
    Address,
    'houseNo' | 'street' | 'city' | 'state' | 'country' | 'pincode'
  >;

  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;

  items: OrderItemDto[];

  placedAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;

  static fromEntity(
    entity: Order,
    customer: UserDto,
    items: OrderItemDto[],
  ): OrderDto {
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
      shippingAddress: entity.shippingAddress,
      discount: entity.discount,
      total: entity.total,
      items,
      placedAt: entity.placedAt,
      updatedAt: entity.updatedAt,
      deliveredAt: entity.deliveredAt ?? undefined,
      cancelledAt: entity.cancelledAt ?? undefined,
    };
  }
}
