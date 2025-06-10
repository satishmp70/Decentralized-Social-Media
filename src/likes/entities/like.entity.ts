import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('likes')
export class Like {
  @PrimaryColumn() post_id: number;

  @PrimaryColumn() wallet_address: string;

  @ManyToOne(() => Post, post => post.likes) post: Post;
}