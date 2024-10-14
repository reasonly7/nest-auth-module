import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaptchaModule } from 'src/captcha/captcha.module';
import { UserModule } from 'src/user/user.module';
import { importJwtModule } from 'src/jwt/importJwtModule';

@Module({
  imports: [importJwtModule(), CaptchaModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
