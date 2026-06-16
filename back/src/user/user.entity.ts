import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({ select: false }) // db조회해서 프론트로 내려줄때 해당 데이터 내려주면 안될때.
  password: string;
}
