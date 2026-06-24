import { LikeEntity } from 'src/like/like.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity; // db에 생성될때는 필드명 + id 여서 userid로 만들어진다.

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes: LikeEntity[];

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
