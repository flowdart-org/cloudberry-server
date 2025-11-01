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
    });
    await client.connect();
    return client;
  },
};
