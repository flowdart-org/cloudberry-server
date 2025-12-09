import { Inject, Injectable } from '@nestjs/common';

import { OrderMapper } from '@/order/mappers/order.mapper';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Order, Order as OrderEntity } from '@/order/entities/order.entity';
import { IOrderRepository } from '@/order/repositories/interfaces/order.repository';

@Injectable()
export class PrismaOrderRepository implements IOrderRepository {
  constructor(
    @Inject('PrismaService') private readonly _prisma: PrismaService,
  ) {}

  public async create(order: OrderEntity): Promise<OrderEntity> {
    const data = OrderMapper.toPersistenceCreate(order);
    const created = await this._prisma.order.create({ data });
    return OrderMapper.toEntity(created);
  }

  public async findAll(query: {
    limit: number;
    page: number;
  }): Promise<Order[]> {
    const { limit, page } = query;

    const rows = await this._prisma.order.findMany({
      orderBy: { placedAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return rows.map(OrderMapper.toEntity);
  }

  public async countAll(): Promise<number> {
    return this._prisma.order.count({
      where: { isDeleted: false },
    });
  }

  public async findById(id: string): Promise<OrderEntity | null> {
    const found = await this._prisma.order.findUnique({ where: { id } });
    return found ? OrderMapper.toEntity(found) : null;
  }

  public async findByOrderNumber(
    orderNumber: string,
  ): Promise<OrderEntity | null> {
    const found = await this._prisma.order.findUnique({
      where: { orderNumber },
    });
    return found ? OrderMapper.toEntity(found) : null;
  }

  public async update(id: string, order: OrderEntity): Promise<OrderEntity> {
    const data = OrderMapper.toPersistenceUpdate(order);
    const updated = await this._prisma.order.update({
      where: { id },
      data,
    });
    return OrderMapper.toEntity(updated);
  }

  public async listByUser(
    userId: string,
    query: { limit: number; page: number },
  ): Promise<OrderEntity[]> {
    const { limit = 20, page = 1 } = query;

    const rows = await this._prisma.order.findMany({
      where: { userId, isDeleted: false },
      orderBy: { placedAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return rows.map(OrderMapper.toEntity);
  }

  public async softDelete(id: string): Promise<void> {
    await this._prisma.order.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
