import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        NODE_ENV: Joi.string().default('development'),
        DATABASE_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().default('3600s'),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_MSG_SERVICE_SID: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
