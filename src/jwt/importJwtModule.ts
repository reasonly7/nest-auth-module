import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const importJwtModule = () => {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      };
    },
  });
};
