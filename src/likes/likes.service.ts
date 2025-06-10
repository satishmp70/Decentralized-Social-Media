import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private repo: Repository<Like>) { }

  async like(postId: number, wallet_address: string) {
    const existing = await this.repo.findOneBy({ post_id: postId, wallet_address });
    if (existing) return existing;
    return this.repo.save({ post_id: postId, wallet_address });
  }
  async findAll() {
    const likes = await this.repo.find();
    return likes;
  }
}
