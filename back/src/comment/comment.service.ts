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

  async findOne(id: number): Promise<CommentEntity | null> {
    return this.commentRepository.findOne({ where: { id } });
  }

  async create(
    createCommentDto: CreateCommentDto,
    user,
  ): Promise<CommentEntity> {
    return this.commentRepository.save({ ...createCommentDto, user });
  }
}
