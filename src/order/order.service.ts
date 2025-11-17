import { v4 as uuidv4 } from 'uuid';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Order } from '@/order/entities/order.entity';
import { CreateOrderDto } from '@/order/dto/create-order.dto';
import type { IOrderRepository } from '@/order/repositories/interfaces/order.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository') private readonly repo: IOrderRepository,
  ) {}

  public async create(dto: CreateOrderDto): Promise<Order> {
    const id = uuidv4();
    const orderNumber = this.generateOrderNumber();

    const entity = new Order({
      id,
      orderNumber,
      userId: dto.userId,
      subtotal: dto.subtotal,
      shippingCharge: dto.shippingCharge ?? 0,
      tax: dto.tax ?? 0,
      discount: dto.discount ?? 0,
      total: dto.total,
      items: dto.items,
      metadata: dto.metadata ?? null,
      paymentMethod: dto.paymentMethod ?? null,
      paymentStatus: dto.paymentStatus ?? 'pending',
      orderStatus: dto.orderStatus ?? 'pending',
      shippingAddressJson: dto.shippingAddressJson ?? null,
      addressLine1: dto.addressLine1 ?? null,
      addressLine2: dto.addressLine2 ?? null,
      city: dto.city ?? null,
      state: dto.state ?? null,
      country: dto.country ?? null,
      postalCode: dto.postalCode ?? null,
      addressLabel: dto.addressLabel ?? null,
      recipientName: dto.recipientName ?? null,
      recipientPhone: dto.recipientPhone ?? null,
      isDeleted: false,
    });

    return this.repo.create(entity);
  }

  public async listAll(limit = 20, offset = 0): Promise<Order[]> {
    return this.repo.findAll(limit, offset);
  }

  public async listAllWithCount(
    limit = 20,
    offset = 0,
  ): Promise<{ total: number; data: Order[] }> {
    const [total, data] = await Promise.all([
      this.repo.countAll(),
      this.repo.findAll(limit, offset),
    ]);

    return { total, data };
  }

  public async findById(id: string): Promise<Order> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException(`Order ${id} not found`);
    return found;
  }

  public async findByOrderNumber(orderNumber: string): Promise<Order> {
    const found = await this.repo.findByOrderNumber(orderNumber);
    if (!found) throw new NotFoundException(`Order ${orderNumber} not found`);
    return found;
  }

  public async listByUser(
    userId: string,
    limit?: number,
    offset?: number,
  ): Promise<Order[]> {
    return this.repo.listByUser(userId, limit, offset);
  }

  public async update(order: Order): Promise<Order> {
    // for DDD you might add validation here
    const existing = await this.repo.findById(order.id);
    if (!existing) throw new NotFoundException(`Order ${order.id} not found`);
    return this.repo.update(order);
  }

  public async cancel(id: string, reason?: string): Promise<Order> {
    const existing = await this.findById(id);
    const cancelled = existing.with({
      orderStatus: 'cancelled',
      cancelledAt: new Date(),
      cancelReason: reason ?? null,
    });
    return this.repo.update(cancelled);
  }

  public async softDelete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }

  private generateOrderNumber(): string {
    // simple order number generator — change to your format if needed
    const now = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `ORD-${now}-${rand}`;
  }
}
