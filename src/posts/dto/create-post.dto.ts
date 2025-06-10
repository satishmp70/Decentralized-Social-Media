import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The content of the post',
    example: 'Hello decentralized world!',
    minLength: 1,
    maxLength: 280,
  })
  @IsString()
  @Length(1, 280, { message: 'Post content must be between 1 and 280 characters' })
  content: string;
}