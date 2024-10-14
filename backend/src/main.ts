import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();
  // Set global prefix for all endpoints
  app.setGlobalPrefix('api/v1');

  // app.useLogger(app.get(Logger));

  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
