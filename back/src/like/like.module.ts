import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity]), AuthModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
