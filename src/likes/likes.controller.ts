import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('likes')
@Controller('posts/:postId/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a post' })
  @ApiResponse({ status: 201, description: 'Post liked successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async like(@Request() req, @Param('postId') postId: string) {
    return this.likesService.like(+postId, req.user.sub);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiResponse({ status: 200, description: 'Post unliked successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async unlike(@Request() req, @Param('postId') postId: string) {
    return this.likesService.unlike(+postId, req.user.sub);
  }
}