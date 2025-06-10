import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async create(postId: number, walletAddress: string, dto: CreateCommentDto): Promise<Comment> {
    // Verify post exists
    await this.postsService.findOne(postId);

    const comment = this.repo.create({
      ...dto,
      post_id: postId,
      wallet_address: walletAddress,
    });
    return this.repo.save(comment);
  }

  async remove(id: number, walletAddress: string): Promise<void> {
    const comment = await this.repo.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment.wallet_address !== walletAddress) {
      throw new NotFoundException('You can only delete your own comments');
    }

    await this.repo.remove(comment);
  }

  async findAll(postId: number): Promise<Comment[]> {
    return this.repo.find({
      where: { post_id: postId },
      order: { timestamp: 'DESC' },
    });
  }
}