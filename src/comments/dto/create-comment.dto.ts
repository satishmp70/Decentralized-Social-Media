import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  wallet_address: string;

  @IsString()
  content: string;
}