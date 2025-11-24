import { UserDto } from '@/user/dto/user.dto';
import { Order } from '@/order/entities/order.entity';

export class OrderDto {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
  };

  orderStatus: string;
  paymentMethod?: string | null;
  paymentStatus: string;

  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;

  items: Order['items'];

  placedAt: Date;
  updatedAt: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;

  constructor(entity: Order, customer: UserDto) {
    this.id = entity.id;
    this.orderNumber = entity.orderNumber;
    this.customer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    };

    this.orderStatus = entity.orderStatus;
    this.paymentMethod = entity.paymentMethod;
    this.paymentStatus = entity.paymentStatus;

    this.subtotal = entity.subtotal;
    this.shippingCharge = entity.shippingCharge;
    this.discount = entity.discount;
    this.total = entity.total;

    this.items = entity.items;

    this.placedAt = entity.placedAt;
    this.updatedAt = entity.updatedAt;
    this.deliveredAt = entity.deliveredAt;
    this.cancelledAt = entity.cancelledAt;
  }
}
