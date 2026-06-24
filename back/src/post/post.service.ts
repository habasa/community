import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostInterface } from './interface/post.interface';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { LikeEntity } from 'src/like/like.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  async findAll(): Promise<PostInterface[]> {
    return this.postRepository.find();
  }

  // 게시글 하나 상세
  async findOne(id: number, userId: number | null): Promise<any> {
    let isLiked = false;
    if (userId) {
      const like = await this.likeRepository.findOne({
        where: { post: { id }, user: { id: userId } },
      });
      isLiked = !!like;
    }

    const likeCount = await this.likeRepository.count({
      where: { post: { id } },
    });

    const post = await this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    return { ...post, likeCount, isLiked };
  }

  async create(createPostDto: CreatePostDto, user): Promise<PostEntity> {
    return this.postRepository.save({ ...createPostDto, user });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity | null> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number, user): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (post?.user.id === user.id) {
      await this.postRepository.delete(id);
    } else {
      throw new UnauthorizedException('본인의 게시글만 삭제 가능');
    }
  }
}
