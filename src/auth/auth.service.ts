import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CaptchaService } from 'src/captcha/captcha.service';
import { UserService } from 'src/user/user.service';
import { isNil } from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly captchaServise: CaptchaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const success = await this.captchaServise.validate(
      loginDto.sessionId,
      loginDto.verifyCode,
    );

    if (!success) {
      throw new BadRequestException('Incorrect verification code');
    }
    const user = await this.userService.findOneByName(loginDto.username);
    if (isNil(user) || user.password !== loginDto.password) {
      throw new BadRequestException(
        'Login failed: Incorrect username or password',
      );
    }
    const payload = {
      sub: user.id,
      username: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
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
      ...registerDto,
    });

    return user.id;
  }

  // TODO
  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return 'updatePassword';
  }
}
