import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/config/config.module';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './otp/otp.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule, AuthModule, SmsModule, OtpModule, RedisModule],
})
export class AppModule {}
