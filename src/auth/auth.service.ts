import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { isNil, omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CaptchaService } from 'src/captcha/captcha.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly captchaService: CaptchaService,
  ) {}

  async validateUser(name: string, password: string) {
    const user = await this.userService.findOneByName(name);
    if (isNil(user) || user.password !== password) {
      return false;
    }
    return omit(user, ['password']);
  }

  login(user: User) {
    const payload = { id: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(registerDto: RegisterDto) {
    const { sessionId, verifyCode } = registerDto;
    const success = await this.captchaService.validate(sessionId, verifyCode);
    if (!success) {
      throw new BadRequestException('Incorrect verification code');
    }
    if (await this.userService.checkExist({ name: registerDto.username })) {
      throw new BadRequestException(
        'Registration failed: Username already exists',
      );
    }
    if (await this.userService.checkExist({ email: registerDto.email })) {
      throw new BadRequestException(
        'Registration failed: Email already exists',
      );
    }

    const user = await this.userService.create({
      name: registerDto.username,
      age: registerDto.age,
      email: registerDto.email,
      password: registerDto.password,
    });

    return user.id;
  }
}
