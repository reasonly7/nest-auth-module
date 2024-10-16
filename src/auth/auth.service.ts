import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { isNil, omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
    return { access_token: this.jwtService.sign(payload) };
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
      age: registerDto.age,
      email: registerDto.email,
      password: registerDto.password,
    });

    return user.id;
  }
}
