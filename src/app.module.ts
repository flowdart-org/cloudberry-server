import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from '@/user/user.module';
import { AdminModule } from '@/admin/admin.module';
import { AuthModule } from '@/auth/auth.module';
import { TryOnModule } from '@/ai/try-on/try-on.module';
import { ProductModule } from '@/product/product.module';
import { RolesGuard } from '@/common/guards/roles.guard';
import { MediaModule } from './media/media.module';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { CartModule } from './cart/cart.module';

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
