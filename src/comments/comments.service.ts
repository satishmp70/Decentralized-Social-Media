import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, postId: string, walletAddress: string): Promise<Comment> {
    const comment = this.repo.create({
      content: createCommentDto.content,
      post: { id: postId },
      user: { wallet_address: walletAddress }
    });
    return this.repo.save(comment);
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.repo.findOne({
      where: { id },
      relations: ['user', 'post']
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.repo.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { created_at: 'DESC' }
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}