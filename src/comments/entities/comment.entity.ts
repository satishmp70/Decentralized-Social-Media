import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn() id: number;

  @Column() post_id: number;

  @Column() wallet_address: string;

  @Column() content: string;

  @CreateDateColumn() timestamp: Date;

  @ManyToOne(() => Post, post => post.comments) post: Post;
}