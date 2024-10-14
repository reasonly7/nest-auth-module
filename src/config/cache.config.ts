import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => {
  return {
    globalTTL: Number(process.env.CACHE_GLOBAL_TTL || 60 * 1000),
    captchaTTL: Number(process.env.CACHE_CAPTCHA_TTL || 10 * 1000),
  };
});
