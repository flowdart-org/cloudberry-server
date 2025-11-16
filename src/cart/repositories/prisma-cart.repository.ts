import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { Cart } from '@/cart/entities/cart.entity';
import { CartRepository } from '@/cart/repositories/interfaces/cart.repository';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(@Inject('PrismaClient') private readonly prisma: PrismaClient) {}

  createCart(userId: string): Promise<Cart> {
    return this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: {
        items: true,
      },
    });
  }

  async findById(id: string): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });
  }
}
