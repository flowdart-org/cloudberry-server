import { Order as OrderEntity, OrderItem } from '@/order/entities/order.entity';

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
  userId!: string;
  placedAt!: Date;
  updatedAt!: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;

  subtotal!: number;
  shippingCharge!: number;
  tax!: number;
  discount!: number;
  total!: number;

  items!: OrderItemDto[];
  metadata?: Record<string, unknown> | null;

  paymentMethod?: string | null;
  paymentStatus!: string;
  orderStatus!: string;

  // address
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

  courierName?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;

  cancelReason?: string | null;
  refundAmount?: number | null;

  isDeleted!: boolean;

  static fromEntity(this: void, entity: OrderEntity): OrderResponseDto {
    const dto = new OrderResponseDto();
    dto.id = entity.id;
    dto.orderNumber = entity.orderNumber;
    dto.userId = entity.userId;
    dto.placedAt = entity.placedAt;
    dto.updatedAt = entity.updatedAt;
    dto.deliveredAt = entity.deliveredAt ?? null;
    dto.cancelledAt = entity.cancelledAt ?? null;

    dto.subtotal = entity.subtotal;
    dto.shippingCharge = entity.shippingCharge;
    dto.tax = entity.tax;
    dto.discount = entity.discount;
    dto.total = entity.total;

    dto.items = entity.items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId ?? null,
      name: i.name,
      sku: i.sku ?? null,
      price: i.price,
      quantity: i.quantity,
      subtotal: i.subtotal,
      metadata: i.metadata ?? null,
    }));

    dto.metadata = entity.metadata ?? null;

    dto.paymentMethod = entity.paymentMethod ?? null;
    dto.paymentStatus = entity.paymentStatus;
    dto.orderStatus = entity.orderStatus;

    dto.shippingAddressJson = entity.shippingAddressJson ?? null;
    dto.addressLine1 = entity.addressLine1 ?? null;
    dto.addressLine2 = entity.addressLine2 ?? null;
    dto.city = entity.city ?? null;
    dto.state = entity.state ?? null;
    dto.country = entity.country ?? null;
    dto.postalCode = entity.postalCode ?? null;
    dto.addressLabel = entity.addressLabel ?? null;
    dto.recipientName = entity.recipientName ?? null;
    dto.recipientPhone = entity.recipientPhone ?? null;

    dto.courierName = entity.courierName ?? null;
    dto.trackingNumber = entity.trackingNumber ?? null;
    dto.trackingUrl = entity.trackingUrl ?? null;

    dto.cancelReason = entity.cancelReason ?? null;
    dto.refundAmount = entity.refundAmount ?? null;

    dto.isDeleted = entity.isDeleted;

    return dto;
  }
}
