import { Module } from '@nestjs/common';

import { CartService } from '@/cart/cart.service';
import { CartController } from '@/cart/cart.controller';
import { PrismaCartRepository } from '@/cart/repositories/prisma-cart.repository';
import { ProductModule } from '@/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: 'CartRepository',
      useClass: PrismaCartRepository,
    },
  ],
})
export class CartModule {}
