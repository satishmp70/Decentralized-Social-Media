import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { VerifyWalletDto } from './dto/verify-wallet.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify')
  verify(@Body() dto: VerifyWalletDto) {
    return this.authService.verifySignature(dto.signature, dto.message);
  }
}
