import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  wallet_address: string;

  @IsString()
  content: string;
}