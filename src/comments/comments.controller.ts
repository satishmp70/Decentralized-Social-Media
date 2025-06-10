import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(+postId, dto);
  }
}