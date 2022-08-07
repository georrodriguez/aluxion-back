import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Documentación
  const config = new DocumentBuilder()
    .setTitle('Aluxion Back-end Ejercicio API')
    .setDescription('Documentación para Ejercicio Aluxion - Georgette')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  // Documentación
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
