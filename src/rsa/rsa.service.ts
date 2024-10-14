import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { readFileSync } from 'fs';

@Injectable()
export class RsaService {
  #privateKey: string;
  #publicKey: string;

  constructor(private readonly configService: ConfigService) {
    this.#privateKey = readFileSync(
      this.configService.get<string>('rsa.privateKeyPath'),
      'utf-8',
    );
    this.#publicKey = readFileSync(
      this.configService.get<string>('rsa.publicKeyPath'),
      'utf-8',
    );
  }

  getPublicKey() {
    return this.#publicKey;
  }

  encrypt(text: string) {
    const encryptedData = crypto.publicEncrypt(
      {
        key: this.#publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // 指定哈希算法
      },
      Buffer.from(text),
    );
    return encryptedData.toString('base64');
  }

  decrypt(encryptedText: string) {
    const buffer = Buffer.from(encryptedText, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: this.#privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      buffer,
    );

    return decrypted.toString('utf8');
  }
}
