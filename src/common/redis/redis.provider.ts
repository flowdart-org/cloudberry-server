import { createClient } from 'redis';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const REDIS_CLIENT = 'REDIS_CLIENT';

const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const configService = new ConfigService();
    const REDIS_URL = configService.getOrThrow<string>('REDIS_URL');
    const NODE_ENV = configService.getOrThrow<string>('NODE_ENV');
    const client = createClient({
      url: REDIS_URL,
      // @ts-expect-error -- types are outdated
      socket: {
        tls: NODE_ENV === 'production',
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
export default redisProvider;
