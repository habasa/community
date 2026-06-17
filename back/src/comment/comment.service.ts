import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async findByPostId(postId: number): Promise<CommentEntity[] | null> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: { user: true },
    });
  }

  // save에서는 where안씀
  async create(
    postId: number,
    createCommentDto: CreateCommentDto,
    user,
  ): Promise<CommentEntity> {
    return this.commentRepository.save({
      ...createCommentDto,
      post: { id: postId },
      user,
    });
  }
}
