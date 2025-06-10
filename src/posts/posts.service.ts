import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  findAll() {
    return this.repo.find({ order: { timestamp: 'DESC' } });
  }

  create(dto: CreatePostDto) {
    return this.repo.save(dto);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['comments', 'likes'] });
  }
}