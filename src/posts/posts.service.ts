import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.repo.find({
      order: { timestamp: 'DESC' },
      relations: ['comments', 'likes'],
    });
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const post = this.repo.create(dto);
    return this.repo.save(post);
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['comments', 'likes'],
    });
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    return post;
  }

  async remove(id: number, walletAddress: string): Promise<void> {
    const post = await this.findOne(id);
    
    if (post.wallet_address !== walletAddress) {
      throw new NotFoundException('You can only delete your own posts');
    }
    
    await this.repo.remove(post);
  }
}