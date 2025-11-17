import {
  OrderItem,
  OrderStatus,
  PaymentStatus,
} from '@/order/entities/order.entity';

export class CreateOrderDto {
  userId!: string;
  subtotal!: number;
  shippingCharge?: number;
  tax?: number;
  discount?: number;
  total!: number;
  items!: OrderItem[];
  metadata?: Record<string, unknown> | null;

  paymentMethod?: string | null;
  paymentStatus?: PaymentStatus;
  orderStatus?: OrderStatus;

  shippingAddressJson?: Record<string, unknown> | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  addressLabel?: string | null;
  recipientName?: string | null;
  recipientPhone?: string | null;
}
