import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, CartItem } from '@prisma/client';
import { CartRepository } from './interfaces/cart.repository';
import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { UpdateCartDto } from '@/cart/dto/update-cart.dto';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(@Inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async addToCart(userId: string, dto: CreateCartDto): Promise<CartItem> {
    const { productId, variantId, quantity } = dto;
    return this.prisma.cartItem.create({
      data: { userId, productId, variantId, quantity },
    });
  }

  async findUserCart(userId: string): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: { category: true, variants: true },
        },
      },
    });
  }

  async updateQuantity(
    userId: string,
    itemId: string,
    dto: UpdateCartDto,
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { userId, id: itemId },
      data: { quantity: dto.quantity },
    });
  }

  async removeItem(userId: string, itemId: string): Promise<CartItem> {
    return this.prisma.cartItem.delete({ where: { userId, id: itemId } });
  }

  async clearCart(userId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({ where: { userId } });
  }

  async findItemById(itemId: string): Promise<CartItem | null> {
    return this.prisma.cartItem.findUnique({ where: { id: itemId } });
  }

  async findExistingItem(
    userId: string,
    productId: string,
    variantId?: string,
  ): Promise<CartItem | null> {
    return this.prisma.cartItem.findFirst({
      where: { userId, productId, variantId },
    });
  }
}
