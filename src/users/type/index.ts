import { Exclude } from 'class-transformer';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';

export interface User {
  id: number;

  username: string;

  password: string;

  createdAt: Date;

  authStrategy: string;

  profile: Profile;

  posts: Post[];

  access_token: string;
}

export class SerializedUser {
  @Exclude()
  password: string;

  @Exclude()
  authStrategy: string;

  access_token: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
