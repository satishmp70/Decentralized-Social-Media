import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('likes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('post/:postId')
  @ApiOperation({ summary: 'Toggle like on a post' })
  @ApiResponse({ status: 200, description: 'Like toggled successfully' })
  async toggleLike(@Param('postId') postId: string, @Request() req) {
    return this.likesService.toggleLike(postId, req.user.sub);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get all likes for a post' })
  @ApiResponse({ status: 200, description: 'Return all likes for the post' })
  async findByPost(@Param('postId') postId: string) {
    return this.likesService.findByPost(postId);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get all likes by the current user' })
  @ApiResponse({ status: 200, description: 'Return all likes by the user' })
  async findByUser(@Request() req) {
    return this.likesService.findByUser(req.user.sub);
  }
}