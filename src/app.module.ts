import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from '@/user/user.module';
import { CartModule } from '@/cart/cart.module';
import { AuthModule } from '@/auth/auth.module';
import { OrderModule } from '@/order/order.module';
import { AdminModule } from '@/admin/admin.module';
import { MediaModule } from '@/media/media.module';
import { TryOnModule } from '@/ai/try-on/try-on.module';
import { ProductModule } from '@/product/product.module';
import { RolesGuard } from '@/common/guards/roles.guard';
import { PaymentModule } from '@/payment/payment.module';
import { WebhookModule } from '@/webhook/webhook.module';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    AdminModule,
    ProductModule,
    TryOnModule,
    MediaModule,
    CartModule,
    PaymentModule,
    WebhookModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
