import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/config/config.module';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './otp/otp.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from '@/user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { PrismaClient } from '@/common/prisma/prisma-client';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    SmsModule,
    OtpModule,
    RedisModule,
    AdminModule,
    ProductModule,
  ],
  providers: [PrismaClient],
})
export class AppModule {}
