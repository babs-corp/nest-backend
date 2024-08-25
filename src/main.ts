import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
dotenv.config();

const logger = new Logger('MAIN');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { SwaggerHelper } = await import('./app/swagger.helper');
  const swaggerHelper = new SwaggerHelper(logger);
  app.enableCors(swaggerHelper.corsOptions);
  swaggerHelper.build(app);

  await app.listen(process.env.PORT);
  console.log(`successfully started on http://localhost:${process.env.PORT}`);
}
bootstrap();
