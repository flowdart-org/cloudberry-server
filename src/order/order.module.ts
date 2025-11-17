import { Module } from '@nestjs/common';

import { OrderService } from '@/order/order.service';
import { OrderController } from '@/order/order.controller';
import { PrismaOrderRepository } from '@/order/repositories/prisma-order.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: 'OrderRepository', useClass: PrismaOrderRepository },
  ],
  exports: [OrderService],
})
export class OrderModule {}
