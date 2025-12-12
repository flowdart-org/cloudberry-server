import { Prisma, Order as PrismaOrder } from '@prisma/client';

import { Address } from '@/user/entities/address.entity';
import { Order, OrderItem } from '@/order/entities/order.entity';
import { JsonValidatorUtil } from '@/common/utils/json-validator.util';

export const OrderMapper = {
  toEntity(this: void, prismaOrder: PrismaOrder): Order {
    const items = prismaOrder.items as OrderItem[];

    return new Order({
      id: prismaOrder.id,
      orderNumber: prismaOrder.orderNumber,
      userId: prismaOrder.userId,
      placedAt: prismaOrder.placedAt,
      updatedAt: prismaOrder.updatedAt ?? null,
      deliveredAt: prismaOrder.deliveredAt ?? undefined,
      cancelledAt: prismaOrder.cancelledAt ?? undefined,

      subtotal: prismaOrder.subtotal,
      shippingCharge: prismaOrder.shippingCharge,
      tax: prismaOrder.tax,
      discount: prismaOrder.discount,
      total: prismaOrder.total,

      items: items,
      metadata: JsonValidatorUtil.toJsonObject(prismaOrder.metadata) ?? {},

      paymentMethod: prismaOrder.paymentMethod ?? null,
      paymentStatus: prismaOrder.paymentStatus,
      orderStatus: prismaOrder.orderStatus,

      shippingAddress: JsonValidatorUtil.toJsonObject(
        prismaOrder.shippingAddressJson,
      ) as unknown as Address,

      cancelReason: prismaOrder.cancelReason ?? null,
      refundAmount: prismaOrder.refundAmount ?? null,

      isDeleted: prismaOrder.isDeleted,
    });
  },

  toPersistenceCreate(order: Order): Prisma.OrderCreateInput {
    return {
      orderNumber: order.orderNumber,
      user: {
        connect: { id: order.userId },
      },
      placedAt: order.placedAt,

      subtotal: order.subtotal,
      shippingCharge: order.shippingCharge,
      discount: order.discount,
      total: order.total,

      items: JsonValidatorUtil.toJsonValue(order.items),
      metadata: JsonValidatorUtil.toJsonObject(order.metadata),

      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,

      shippingAddressJson: JsonValidatorUtil.toJsonObject(
        order.shippingAddress,
      ),

      isDeleted: order.isDeleted,
    };
  },

  toPersistenceUpdate(order: Order): Prisma.OrderUpdateInput {
    return {
      deliveredAt: order.deliveredAt,
      cancelledAt: order.cancelledAt,

      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,

      cancelReason: order.cancelReason,

      isDeleted: order.isDeleted,
    };
  },
};
