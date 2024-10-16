import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaptchaModule } from 'src/captcha/captcha.module';
import { UserModule } from 'src/user/user.module';
import { importJwtModule } from 'src/jwt/importJwtModule';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuardProvider } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [importJwtModule(), CaptchaModule, UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthGuardProvider],
})
export class AuthModule {}
