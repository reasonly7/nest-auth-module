import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('rsa', () => {
  return {
    publicKeyPath: join(__dirname, '..', '..', 'public.key'),
    privateKeyPath: join(__dirname, '..', '..', 'private.key'),
  };
});
