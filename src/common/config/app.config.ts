import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { GlobalExceptionFilter } from '@/common/filters/http-exception.filter';

export function setupApp(app: INestApplication) {
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const origins = configService.getOrThrow<string>('CORS_ORIGIN').split(',');

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(morgan('dev'));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('CloudBerry API')
    .setDescription('API documentation for the CLoudBerry E-commerce Api')
    .setVersion('1.0')
    .setContact(
      'Rahil K',
      'https://www.linkedin.com/in/rahil234/',
      'rahilsardar234@gmail.com',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    ui: true,
  });

  SwaggerModule.setup('api/docs-json', app, document, {
    ui: false,
  });
}
