import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { UUID } from 'crypto';
import { Public } from 'src/auth/jwt-auth.guard';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Public()
  @Get()
  get() {
    return this.captchaService.generate();
  }

  @Get('verify/:sessionId')
  async verify(
    @Param('sessionId', ParseUUIDPipe) sessionId: UUID,
    @Query('userInput') userInput: string,
  ) {
    const success = await this.captchaService.validate(sessionId, userInput);
    return { success };
  }
}
