import { createClient } from 'redis';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const configService = new ConfigService();
    const REDIS_URL = configService.getOrThrow<string>('REDIS_URL');
    const client = createClient({
      url: REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) return new Error('Too many reconnect attempts');
          console.log(`Reconnecting to Redis... attempt #${retries}`);
          return Math.min(retries * 50, 2000);
        },
      },
    });
    await client.connect();
    return client;
  },
};
