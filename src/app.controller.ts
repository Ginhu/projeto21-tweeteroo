import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SignUpDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  postSignUp(@Body() body: SignUpDto) {
    return this.appService.postSignUp(body);
  }
}
