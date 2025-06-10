import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private repo: Repository<Like>,
    private readonly postsService: PostsService,
  ) {}

  async like(postId: number, walletAddress: string): Promise<Like> {
    // Verify post exists
    await this.postsService.findOne(postId);

    const existing = await this.repo.findOneBy({ post_id: postId, wallet_address: walletAddress });
    if (existing) {
      return existing;
    }

    return this.repo.save({ post_id: postId, wallet_address: walletAddress });
  }

  async unlike(postId: number, walletAddress: string): Promise<void> {
    const like = await this.repo.findOneBy({ post_id: postId, wallet_address: walletAddress });
    if (like) {
      await this.repo.remove(like);
    }
  }

  async findAll(): Promise<Like[]> {
    return this.repo.find();
  }
}
