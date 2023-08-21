import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SignUpDto } from './dto/user.dto';
import { TweetDto } from './dto/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  postSignUp(@Body() body: SignUpDto) {
    return this.appService.postSignUp(body);
  }

  @Post('/tweets')
  @HttpCode(HttpStatus.CREATED)
  postTweet(@Body() body: TweetDto) {
    return this.appService.postTweet(body);
  }

  @Get('/tweets')
  @HttpCode(HttpStatus.OK)
  getTweets(@Query('page') page: string) {
    return this.appService.getTweets(page);
  }

  @Get('/tweets/:username')
  @HttpCode(HttpStatus.OK)
  getTweetsUser(@Param('username') username: string) {
    return this.appService.getTweetsUser(username);
  }
}
