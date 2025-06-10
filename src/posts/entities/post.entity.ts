import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn() id: number;

  @Column() wallet_address: string;

  @Column({ length: 280 }) content: string;

  @CreateDateColumn() timestamp: Date;

  @OneToMany(() => Comment, comments => comments.post) comments: Comment[];

  @OneToMany(() => Like, likes => likes.post) likes: Like[];
}