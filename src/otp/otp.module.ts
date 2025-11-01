import { Module } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { OtpService } from '@/otp/otp.service';
import { REDIS_CLIENT } from '@/common/redis/redis.provider';
import { RedisModule } from '@/common/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: OtpService,
      useFactory: (redisClient: RedisClientType) => new OtpService(redisClient),
      inject: [REDIS_CLIENT],
    },
  ],
  exports: [OtpService],
})
export class OtpModule {}
