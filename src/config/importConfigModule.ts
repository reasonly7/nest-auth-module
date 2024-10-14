import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import databaseConfig from './database.config';
import appConfig from './app.config';
import swaggerConfig from './swagger.config';
import cacheConfig from './cache.config';
import rsaConfig from './rsa.config';

export const importConfigModule = () => {
  return ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: [
      path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}.local`),
      path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
      path.resolve(__dirname, '../../.env'),
    ],
    load: [appConfig, databaseConfig, swaggerConfig, cacheConfig, rsaConfig],
  });
};
