import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    expiresIn: process.env.JWT_EXPIRES_IN || '6h',
    secret: process.env.JWT_SECRET,
  };
});
