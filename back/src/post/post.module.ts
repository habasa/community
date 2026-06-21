import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LikeEntity } from 'src/like/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, LikeEntity]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
