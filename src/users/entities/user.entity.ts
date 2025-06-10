import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn() wallet_address: string;
  @Column({ nullable: true }) username: string;
  @Column({ nullable: true }) bio: string;
  @Column({ nullable: true }) profile_pic_url: string;
}