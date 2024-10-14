import { Body, Controller, Get, Post } from '@nestjs/common';
import { RsaService } from './rsa.service';
import { EncryptDto } from './dto/encrypt.dto';
import { DecryptDto } from './dto/decrypt.dto';

@Controller('rsa')
export class RsaController {
  constructor(private readonly rsaService: RsaService) {}

  @Get('public-key')
  getPublicKey() {
    return this.rsaService.getPublicKey();
  }

  @Post('encrypt')
  encrypt(@Body() encryptDto: EncryptDto) {
    return this.rsaService.encrypt(encryptDto.text);
  }

  @Post('decrypt')
  decrypt(@Body() encryptDto: DecryptDto) {
    return this.rsaService.decrypt(encryptDto.encryptedText);
  }
}
