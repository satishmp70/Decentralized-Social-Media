
import { IsString } from 'class-validator';

export class VerifyWalletDto {
  @IsString()
  signature: string;

  @IsString()
  message: string;
}