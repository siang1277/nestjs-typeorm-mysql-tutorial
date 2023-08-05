import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import { Profile } from './Profile';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  // @Exclude()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  // @Exclude()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  // @Exclude()
  authStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Column({ type: 'boolean', default: false })
  verified: boolean;
}
