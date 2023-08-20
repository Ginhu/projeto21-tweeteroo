import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private users: User[];
  private tweeets: Tweet[];

  constructor() {
    this.users = [];
    this.tweeets = [];
  }
  getHello(): string {
    return 'Hello World!';
  }
  postSignUp(body: SignUpDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }
}
