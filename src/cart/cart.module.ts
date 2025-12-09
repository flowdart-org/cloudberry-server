import { forwardRef, Module } from '@nestjs/common';

import { OrderModule } from '@/order/order.module';
import { ProductModule } from '@/product/product.module';
import { PaymentModule } from '@/payment/payment.module';
import { CartService } from '@/cart/services/cart.service';
import { VariantModule } from '@/product/variant/variant.module';
import { CartController } from '@/cart/controllers/cart.controller';
import { PrismaCartRepository } from '@/cart/repositories/prisma-cart.repository';
import { PrismaCartItemRepository } from '@/cart/repositories/prisma-cart-item.repository';

@Module({
  imports: [
    ProductModule,
    VariantModule,
    forwardRef(() => PaymentModule),
    OrderModule,
  ],
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: 'CartRepository',
      useClass: PrismaCartRepository,
    },
    {
      provide: 'CartItemRepository',
      useClass: PrismaCartItemRepository,
    },
  ],
  exports: [CartService],
})
export class CartModule {}
