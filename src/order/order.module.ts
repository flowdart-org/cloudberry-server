import { Module } from '@nestjs/common';

import { UserModule } from '@/user/user.module';
import { ProductModule } from '@/product/product.module';
import { OrderService } from '@/order/services/order.service';
import { OrderController } from '@/order/controllers/order.controller';
import { PrismaOrderRepository } from '@/order/repositories/prisma-order.repository';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: 'OrderRepository', useClass: PrismaOrderRepository },
  ],
  exports: [OrderService],
})
export class OrderModule {}
