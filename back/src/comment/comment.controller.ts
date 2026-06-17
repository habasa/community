import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('post/:postId')
  async findByPostId(
    @Param('postId') postId: number,
  ): Promise<CommentEntity[] | null> {
    return this.commentService.findByPostId(postId);
  }

  // 아무나 쓰면 안되니까 가드를 건다.
  @UseGuards(JwtAuthGuard)
  @Post('post/:postId')
  async create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req, // 프론트 요청 전부 다 가져옴.
  ): Promise<CommentEntity> {
    return this.commentService.create(postId, createCommentDto, req.user);
  }
}

// @Req() req는 request 전체를 가져오는 거예요. 그래서 req.body, req.params, req.headers 다 접근할 수 있어요.

// 근데 우리가 req.user를 쓰는 이유는 — Guard가 토큰을 검증하고 request.user에 유저 정보를 넣어줬기 때문이에요. 이건 프론트가 직접 보낸 게 아니라 Guard가 중간에 넣어준 거예요!

// 정리하면:

// @Body() → request에서 body만 꺼냄
// @Param() → request에서 파라미터만 꺼냄
// @Req() → request 전체 (Guard가 넣어준 user 포함)
