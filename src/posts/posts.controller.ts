import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
}
