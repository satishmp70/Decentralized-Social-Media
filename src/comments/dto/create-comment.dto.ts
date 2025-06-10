import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'Great post!',
    minLength: 1,
    maxLength: 500,
  })
  @IsString()
  @Length(1, 500, { message: 'Comment content must be between 1 and 500 characters' })
  content: string;
}