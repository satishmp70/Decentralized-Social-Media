import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Like } from './likes/entities/like.entity';
import { Comment } from './comments/entities/comment.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  // Get queryRunner to run raw SQL queries
  const queryRunner = dataSource.createQueryRunner();

  // Connect queryRunner
  await queryRunner.connect();

  try {
    // Disable FK checks temporarily (optional, safer with truncate cascade)
    // await queryRunner.query('SET session_replication_role = replica;');

    // Truncate tables in order respecting dependencies with CASCADE
    await queryRunner.query('TRUNCATE TABLE comments CASCADE');
    await queryRunner.query('TRUNCATE TABLE likes CASCADE');
    await queryRunner.query('TRUNCATE TABLE posts CASCADE');
    await queryRunner.query('TRUNCATE TABLE users CASCADE');

    // Re-enable FK checks if disabled above
    // await queryRunner.query('SET session_replication_role = DEFAULT;');

    // Create Users
    const userRepo = dataSource.getRepository(User);
    const postRepo = dataSource.getRepository(Post);
    const likeRepo = dataSource.getRepository(Like);
    const commentRepo = dataSource.getRepository(Comment);

    const user1 = userRepo.create({
      wallet_address: '0x123',
      username: 'alice',
      bio: 'Blockchain enthusiast',
      profile_pic_url: '',
    });
    const user2 = userRepo.create({
      wallet_address: '0x456',
      username: 'bob',
      bio: 'Web3 dev',
      profile_pic_url: '',
    });
    await userRepo.save([user1, user2]);

    // Create Posts
    const post1 = postRepo.create({
      wallet_address: user1.wallet_address,
      content: 'Hello decentralized world!',
      timestamp: new Date(),
    });
    const post2 = postRepo.create({
      wallet_address: user2.wallet_address,
      content: 'Web3 is the future.',
      timestamp: new Date(),
    });
    await postRepo.save([post1, post2]);

    // Add Likes
    await likeRepo.save([
      { post_id: post1.id, wallet_address: user2.wallet_address },
      { post_id: post2.id, wallet_address: user1.wallet_address },
    ]);

    // Add Comments
    await commentRepo.save([
      {
        post_id: post1.id,
        wallet_address: user2.wallet_address,
        content: 'Nice post!',
        timestamp: new Date(),
      },
      {
        post_id: post2.id,
        wallet_address: user1.wallet_address,
        content: 'Absolutely agree!',
        timestamp: new Date(),
      },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Release queryRunner and close app context
    await queryRunner.release();
    await app.close();
  }
}

bootstrap();
