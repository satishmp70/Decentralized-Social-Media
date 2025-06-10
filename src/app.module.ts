import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Like } from './likes/entities/like.entity';
import { Comment } from './comments/entities/comment.entity';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: {
        required: ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE', 'JWT_SECRET'],
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const portStr = configService.get<string>('DB_PORT');
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_DATABASE');

        // Validate required environment variables
        if (!host || !portStr || !username || !password || !database) {
          throw new Error('Missing required database configuration. Please check your .env file.');
        }

        const port = parseInt(portStr, 10);
        if (isNaN(port)) {
          throw new Error('Invalid DB_PORT value. Must be a number.');
        }

        console.log('Database Configuration:', {
          host,
          port,
          username,
          database,
          // Don't log the password for security
        });

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [User, Post, Like, Comment],
          synchronize: configService.get('NODE_ENV') !== 'production',
          logging: configService.get('NODE_ENV') === 'development',
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    LikesModule,
    CommentsModule,
  ],
})
export class AppModule {}
