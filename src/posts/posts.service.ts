import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.repo.find({
      relations: ['user', 'comments', 'likes'],
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['user', 'comments', 'likes']
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(createPostDto: CreatePostDto, walletAddress: string): Promise<Post> {
    const post = this.repo.create({
      content: createPostDto.content,
      user: { wallet_address: walletAddress }
    });
    return this.repo.save(post);
  }

  async remove(id: string, walletAddress: string): Promise<void> {
    const post = await this.findOne(id);
    if (post.user.wallet_address !== walletAddress) {
      throw new NotFoundException('You can only delete your own posts');
    }
    await this.repo.remove(post);
  }
}