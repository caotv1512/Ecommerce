import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config/swagger-config';
import * as formidable from 'express-formidable';
import * as multer from 'multer';
async function bootstrap() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);
  // app.use(formidable())  ;
  app.use(multer().none());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // Sử dụng middleware express-formidable
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(PORT, () => {
    console.log(`App listen on port: http://localhost:${PORT}`);
    console.log(`Swagger-UI listen on: http://localhost:${PORT}/api-docs`);
  });
}
bootstrap();
