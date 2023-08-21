import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { TweetDto } from './dto/tweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }
  getHello(): string {
    return 'Hello World!';
  }

  postSignUp(body: SignUpDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  postTweet(body: TweetDto) {
    const userSignedUp = this.users.find(
      (user) => user.username === body.username,
    );
    if (!userSignedUp) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    } else {
      const tweet = new Tweet(userSignedUp, body.tweet);
      return this.tweets.push(tweet);
    }
  }

  getTweets(page: string) {
    let paginacao: number;
    if (!page) {
      paginacao = 1;
    } else if (Number(page) < 1 || isNaN(Number(page))) {
      throw new HttpException(
        'Informe uma página válida!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      paginacao = Number(page);
    }

    const tweets = this.tweets.map((el) => {
      const username = el.user.username;
      const avatar = el.user.avatar;
      const tweet = el.tweeet;

      return { username, avatar, tweet };
    });

    const tweetsReverse = tweets.reverse();

    return tweetsReverse.slice(paginacao * 15 - 15, paginacao * 15 - 1);
  }
}
