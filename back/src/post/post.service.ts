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

  async findOne(id: number): Promise<PostEntity | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });
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

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
