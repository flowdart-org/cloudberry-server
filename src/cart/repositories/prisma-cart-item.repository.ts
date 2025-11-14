import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, CartItem } from '@prisma/client';

import { CartItemRepository } from '@/cart/repositories/interfaces/cart-item.repository';

@Injectable()
export class PrismaCartItemRepository implements CartItemRepository {
  constructor(@Inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async addToCart(
    cartId: string,
    data: {
      productId: string;
      variantId: string;
      quantity: number;
    },
  ): Promise<CartItem> {
    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId: data.productId,
        variantId: data.variantId,
        quantity: data.quantity,
      },
    });
  }

  async findCartItems(cartId: string): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({
      where: { cartId },
      include: {
        product: { include: { category: true, variants: true } },
      },
    });
  }

  async updateQuantity(
    itemId: string,
    dto: {
      quantity: number;
    },
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });
  }

  async removeItem(itemId: string): Promise<CartItem> {
    return this.prisma.cartItem.delete({ where: { id: itemId } });
  }

  async clearCart(cartId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({ where: { cartId } });
  }

  async findItemById(itemId: string): Promise<CartItem | null> {
    return this.prisma.cartItem.findUnique({ where: { id: itemId } });
  }

  async findExistingItem(
    cartId: string,
    productId: string,
    variantId?: string,
  ): Promise<CartItem | null> {
    return this.prisma.cartItem.findFirst({
      where: { cartId, productId, variantId },
    });
  }
}
