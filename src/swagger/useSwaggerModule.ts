import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwaggerModule = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription(configService.get<string>('swagger.description'))
    .setVersion(configService.get<string>('swagger.version'))
    .build();

  // Create document by app and generate config.
  const document = SwaggerModule.createDocument(app, config);

  // Visit path, App Instance, Document.
  SwaggerModule.setup(configService.get<string>('swagger.path'), app, document);
};
