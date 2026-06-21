import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  async create(postId: number, user: any) {
    const userLikeState = await this.likeRepository.findOne({
      where: { user: { id: user.id }, post: { id: postId } },
      relations: { user: true },
    });

    if (userLikeState) {
      return this.likeRepository.remove(userLikeState);
    } else {
      return this.likeRepository.save({
        post: { id: postId },
        user,
      });
    }
  }
}

// user: { id: user.id }, === user 같은 말 typeorm이 user의 id만 빼줌
