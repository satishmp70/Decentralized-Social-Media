import { IsString, IsOptional } from 'class-validator';

export class CreateUpdateUserDto {
  @IsString()
  wallet_address: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profile_pic_url?: string;
}