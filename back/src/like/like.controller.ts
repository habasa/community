import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post/:postId')
  async create(@Param('postId') postId: number, @Req() req): Promise<any> {
    return this.likeService.create(postId, req.user);
  }
}
