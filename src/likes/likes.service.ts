import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly repo: Repository<Like>,
  ) {}

  async toggleLike(postId: string, walletAddress: string): Promise<void> {
    const existing = await this.repo.findOne({
      where: {
        post: { id: postId },
        user: { wallet_address: walletAddress }
      }
    });

    if (existing) {
      await this.repo.remove(existing);
    } else {
      const like = this.repo.create({
        post: { id: postId },
        user: { wallet_address: walletAddress }
      });
      await this.repo.save(like);
    }
  }

  async findByPost(postId: string): Promise<Like[]> {
    return this.repo.find({
      where: { post: { id: postId } },
      relations: ['user']
    });
  }

  async findByUser(walletAddress: string): Promise<Like[]> {
    return this.repo.find({
      where: { user: { wallet_address: walletAddress } },
      relations: ['post']
    });
  }
}
