import { forwardRef, Module } from '@nestjs/common';

import { CartService } from '@/cart/cart.service';
import { CartController } from '@/cart/cart.controller';
import { VariantModule } from '@/product/variant/variant.module';
import { PrismaCartRepository } from '@/cart/repositories/prisma-cart.repository';
import { PrismaCartItemRepository } from '@/cart/repositories/prisma-cart-item.repository';
import { ProductModule } from '@/product/product.module';
import { PaymentModule } from '@/payment/payment.module';

@Module({
  imports: [ProductModule, VariantModule, forwardRef(() => PaymentModule)],
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
