import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  verifyCode: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  sessionId: string;

  @IsInt()
  @IsOptional()
  age?: number;
}
