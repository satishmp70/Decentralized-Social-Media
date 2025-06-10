import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Like } from './likes/entities/like.entity';
import { Comment } from './comments/entities/comment.entity';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log('Starting database seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);
  const dataSource = app.get(DataSource);

  // Log database connection details
  console.log('Database Configuration:', {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    database: configService.get('DB_DATABASE'),
  });

  // Verify database connection
  if (!dataSource.isInitialized) {
    console.log('Initializing database connection...');
    await dataSource.initialize();
  }
  console.log('Database connection established');

  // Get queryRunner to run raw SQL queries
  const queryRunner = dataSource.createQueryRunner();

  // Connect queryRunner
  await queryRunner.connect();
  console.log('QueryRunner connected');

  try {
    // Verify we're connected to the correct database
    const currentDb = await queryRunner.query('SELECT current_database()');
    console.log('Connected to database:', currentDb[0].current_database);

    // Disable FK checks temporarily (optional, safer with truncate cascade)
    // await queryRunner.query('SET session_replication_role = replica;');

    console.log('Truncating existing tables...');
    // Truncate tables in order respecting dependencies with CASCADE
    await queryRunner.query('TRUNCATE TABLE comments CASCADE');
    await queryRunner.query('TRUNCATE TABLE likes CASCADE');
    await queryRunner.query('TRUNCATE TABLE posts CASCADE');
    await queryRunner.query('TRUNCATE TABLE users CASCADE');
    console.log('Tables truncated successfully');

    // Re-enable FK checks if disabled above
    // await queryRunner.query('SET session_replication_role = DEFAULT;');

    // Create Users
    console.log('Creating users...');
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
    const savedUsers = await userRepo.save([user1, user2]);
    console.log('Users created:', savedUsers);

    // Create Posts
    console.log('Creating posts...');
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
    const savedPosts = await postRepo.save([post1, post2]);
    console.log('Posts created:', savedPosts);

    // Add Likes
    console.log('Adding likes...');
    const savedLikes = await likeRepo.save([
      { post_id: post1.id, wallet_address: user2.wallet_address },
      { post_id: post2.id, wallet_address: user1.wallet_address },
    ]);
    console.log('Likes added:', savedLikes);

    // Add Comments
    console.log('Adding comments...');
    const savedComments = await commentRepo.save([
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
    console.log('Comments added:', savedComments);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error; // Re-throw to see full error stack
  } finally {
    // Release queryRunner and close app context
    await queryRunner.release();
    await app.close();
  }
}

bootstrap();