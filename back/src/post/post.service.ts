import { Injectable } from '@nestjs/common';
import { PostInterface } from './interface/post.interface';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostInterface[]> {
    return this.postRepository.find();
  }

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postRepository.save(createPostDto);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity | null> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
