import { Module } from '@nestjs/common';

import { UserModule } from '@/user/user.module';
import { ProductModule } from '@/product/product.module';
import { OrderService } from '@/order/services/order.service';
import { VariantModule } from '@/product/variant/variant.module';
import { OrderController } from '@/order/controllers/order.controller';
import { OrderNumberService } from '@/order/services/order-number.service';
import { PrismaOrderRepository } from '@/order/repositories/prisma-order.repository';

@Module({
  imports: [UserModule, ProductModule, VariantModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderNumberService,
    { provide: 'OrderRepository', useClass: PrismaOrderRepository },
  ],
  exports: [OrderService],
})
export class OrderModule {}
