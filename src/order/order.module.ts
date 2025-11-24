import { Module } from '@nestjs/common';

import { OrderService } from '@/order/order.service';
import { OrderController } from '@/order/order.controller';
import { PrismaOrderRepository } from '@/order/repositories/prisma-order.repository';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: 'OrderRepository', useClass: PrismaOrderRepository },
  ],
  exports: [OrderService],
})
export class OrderModule {}
