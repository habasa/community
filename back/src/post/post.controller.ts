import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostInterface } from './interface/post.interface';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll(): Promise<PostInterface[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req,
  ): Promise<PostEntity> {
    return this.postService.create(createPostDto, req.user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity | null> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}

// 프론트에서 POST /posts 요청 (title, content 보냄)
//   → Controller가 @Body()로 데이터 받음
//     → Service에 넘김
//       → Repository.save()로 DB에 저장
//         → 저장된 결과 응답
// DB에서 나오는 것 → PostEntity 사용
// 프론트에 보여줄 것 → PostInterface (또는 DTO) 사용

// 용도	이름	필드
// 프론트 → 백엔드 (받을 때) / CreatePostDto	title, content
// DB 테이블 / PostEntity	id, title, content
// 백엔드 → 프론트 (줄 때) / PostInterface	id, title, content
