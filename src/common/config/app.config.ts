import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

export function setupApp(app: INestApplication) {
  app.use(
    morgan('dev', {
      skip: (req) => req.method === 'OPTIONS',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ZenFashionStudio API')
    .setDescription('API documentation for the ZenFashionStudio E-commerce Api')
    .setVersion('1.0')
    .setContact(
      'Contact The Developer',
      'http://localhost:4000',
      'https://github.com/rahil234',
    )
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    ui: true,
  });

  SwaggerModule.setup('api/docs-json', app, document, {
    ui: false,
  });

  const configService = app.get(ConfigService);
  const origins = configService.getOrThrow<string>('CORS_ORIGIN').split(',');

  app.use(cookieParser());

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
}
