import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CaptchaService } from 'src/captcha/captcha.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly captchaService: CaptchaService,
  ) {
    super({ passReqToCallback: true });
  }

  async validate(request: Request, username: string, password: string) {
    const { sessionId, verifyCode } = request.body;
    const success = await this.captchaService.validate(sessionId, verifyCode);
    if (!success) {
      throw new BadRequestException('Incorrect verification code');
    }

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(
        `Login failed: User \`${username}\` does not exist, or the password is incorrect.`,
      );
    }

    return user;
  }
}
