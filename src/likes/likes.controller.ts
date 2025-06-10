import { Controller, Post, Param, Body } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('posts/:postId/like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  like(@Param('postId') postId: string, @Body('wallet_address') wallet: string) {
    return this.likesService.like(+postId, wallet);
  }
}