import { PostEntity } from 'src/post/post.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: PostEntity;

  @Column()
  content: string;
}

// { onDelete: 'CASCADE' } 연관된 데이터 삭제 기능 / 부모가 삭제되면 자식도 같이 삭제
// 게시글 삭제시, 댓글도 같이 삭제되는지? 아니면 해당 게시글만 삭제되는지? 우리 앱은 그런지 은총쓰에게 물어보기.
