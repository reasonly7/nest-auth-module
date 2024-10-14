import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSwaggerModule } from './swagger/useSwaggerModule';
import { ConfigService } from '@nestjs/config';
import { useGlobalPipes } from './pipes/useGlobalPipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get('app.globalPrefix'));

  useGlobalPipes(app);
  useSwaggerModule(app);
  await app.listen(configService.get<number>('app.port'));
}
bootstrap();
