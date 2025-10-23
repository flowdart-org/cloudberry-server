import { Module } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { OtpService } from '@/otp/otp.service';
import { REDIS_CLIENT } from '@/redis/redis.provider';

@Module({
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
