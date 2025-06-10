import { Injectable } from '@nestjs/common';
import { verifyMessage } from 'ethers';

@Injectable()
export class AuthService {
   verifySignature(message: string, signature: string): string {
    return verifyMessage(message, signature);
  }

}
