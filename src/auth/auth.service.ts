import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyMessage } from 'ethers';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verifySignature(message: string, signature: string): Promise<{ access_token: string }> {
    try {
      const walletAddress = verifyMessage(message, signature);
      
      // Check if user exists, if not create a new one
      let user = await this.usersService.findOne(walletAddress);
      if (!user) {
        user = await this.usersService.create({ wallet_address: walletAddress });
      }

      // Generate JWT token
      const payload = { sub: walletAddress };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid signature');
    }
  }
}
