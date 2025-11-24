import { Order } from '@/order/entities/order.entity';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findAll(limit: number, offset: number): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByOrderNumber(orderNumber: string): Promise<Order | null>;
  update(id, order: Partial<Order>): Promise<Order>;
  listByUser(userId: string, limit?: number, offset?: number): Promise<Order[]>;
  softDelete(id: string): Promise<void>;
  countAll(): Promise<number>;
}
