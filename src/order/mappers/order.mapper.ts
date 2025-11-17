import { Prisma, Order as PrismaOrder } from '@prisma/client';

import { Order, OrderItems } from '@/order/entities/order.entity';

export const OrderMapper = {
  toEntity(this: void, prismaOrder: PrismaOrder): Order {
    const items = prismaOrder.items as OrderItems;

    return new Order({
      id: prismaOrder.id,
      orderNumber: prismaOrder.orderNumber,
      userId: prismaOrder.userId,
      placedAt: prismaOrder.placedAt,
      updatedAt: prismaOrder.updatedAt ?? null,
      deliveredAt: prismaOrder.deliveredAt ?? null,
      cancelledAt: prismaOrder.cancelledAt ?? null,

      subtotal: prismaOrder.subtotal,
      shippingCharge: prismaOrder.shippingCharge,
      tax: prismaOrder.tax,
      discount: prismaOrder.discount,
      total: prismaOrder.total,

      items: items ?? [],
      metadata: prismaOrder.metadata as Record<string, unknown> | null,

      paymentMethod: prismaOrder.paymentMethod ?? null,
      paymentStatus: prismaOrder.paymentStatus,
      orderStatus: prismaOrder.orderStatus,

      shippingAddressJson: prismaOrder.shippingAddressJson as Record<
        string,
        unknown
      > | null,
      addressLine1: prismaOrder.addressLine1 ?? null,
      addressLine2: prismaOrder.addressLine2 ?? null,
      city: prismaOrder.city ?? null,
      state: prismaOrder.state ?? null,
      country: prismaOrder.country ?? null,
      postalCode: prismaOrder.postalCode ?? null,
      addressLabel: prismaOrder.addressLabel ?? null,
      recipientName: prismaOrder.recipientName ?? null,
      recipientPhone: prismaOrder.recipientPhone ?? null,

      courierName: prismaOrder.courierName ?? null,
      trackingNumber: prismaOrder.trackingNumber ?? null,
      trackingUrl: prismaOrder.trackingUrl ?? null,

      cancelReason: prismaOrder.cancelReason ?? null,
      refundAmount: prismaOrder.refundAmount ?? null,

      isDeleted: prismaOrder.isDeleted,
    });
  },

  toPersistenceCreate(order: Order): Prisma.OrderCreateInput {
    // Prisma's Json type allows raw JS objects
    const items = order.items as unknown as Prisma.JsonValue;
    const metadata = order.metadata as unknown as Prisma.JsonValue | null;
    const shippingAddressJson =
      order.shippingAddressJson as unknown as Prisma.JsonValue | null;

    return {
      orderNumber: order.orderNumber,
      userId: order.userId,
      placedAt: order.placedAt,
      deliveredAt: order.deliveredAt ?? null,
      cancelledAt: order.cancelledAt ?? null,

      subtotal: order.subtotal,
      shippingCharge: order.shippingCharge,
      tax: order.tax,
      discount: order.discount,
      total: order.total,

      items: items ?? [],
      metadata: metadata ?? undefined,

      paymentMethod: order.paymentMethod ?? undefined,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,

      shippingAddressJson: shippingAddressJson ?? undefined,
      addressLine1: order.addressLine1 ?? undefined,
      addressLine2: order.addressLine2 ?? undefined,
      city: order.city ?? undefined,
      state: order.state ?? undefined,
      country: order.country ?? undefined,
      postalCode: order.postalCode ?? undefined,
      addressLabel: order.addressLabel ?? undefined,
      recipientName: order.recipientName ?? undefined,
      recipientPhone: order.recipientPhone ?? undefined,

      courierName: order.courierName ?? undefined,
      trackingNumber: order.trackingNumber ?? undefined,
      trackingUrl: order.trackingUrl ?? undefined,

      cancelReason: order.cancelReason ?? undefined,
      refundAmount: order.refundAmount ?? undefined,

      isDeleted: order.isDeleted,
    };
  },

  toPersistenceUpdate(order: Order): Prisma.OrderUpdateInput {
    const items = order.items as unknown as Prisma.JsonValue;
    const metadata = order.metadata as unknown as Prisma.JsonValue | null;
    const shippingAddressJson =
      order.shippingAddressJson as unknown as Prisma.JsonValue | null;

    return {
      orderNumber: order.orderNumber,
      userId: order.userId,
      placedAt: order.placedAt,
      deliveredAt: order.deliveredAt ?? undefined,
      cancelledAt: order.cancelledAt ?? undefined,

      subtotal: order.subtotal,
      shippingCharge: order.shippingCharge,
      tax: order.tax,
      discount: order.discount,
      total: order.total,

      items: items ?? [],
      metadata: metadata ?? undefined,

      paymentMethod: order.paymentMethod ?? undefined,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,

      shippingAddressJson: shippingAddressJson ?? undefined,
      addressLine1: order.addressLine1 ?? undefined,
      addressLine2: order.addressLine2 ?? undefined,
      city: order.city ?? undefined,
      state: order.state ?? undefined,
      country: order.country ?? undefined,
      postalCode: order.postalCode ?? undefined,
      addressLabel: order.addressLabel ?? undefined,
      recipientName: order.recipientName ?? undefined,
      recipientPhone: order.recipientPhone ?? undefined,

      courierName: order.courierName ?? undefined,
      trackingNumber: order.trackingNumber ?? undefined,
      trackingUrl: order.trackingUrl ?? undefined,

      cancelReason: order.cancelReason ?? undefined,
      refundAmount: order.refundAmount ?? undefined,

      isDeleted: order.isDeleted,
    };
  },
};
