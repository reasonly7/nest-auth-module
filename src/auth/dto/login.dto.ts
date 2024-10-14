import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  verifyCode: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  sessionId: UUID;
}
