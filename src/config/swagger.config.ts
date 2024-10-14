import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => {
  return {
    title: process.env.SWAGGER_TITLE || 'Swagger Title',
    description: process.env.SWAGGER_DESCRIPTION || 'Swagger Description',
    version: process.env.SWAGGER_VERSION || 'v0.0.1',
    path: process.env.SWAGGER_PATH || 'docs',
  };
});
