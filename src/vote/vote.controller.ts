import { Controller, Param, Post, Get, Body } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  async findAll() {
    return this.voteService.findAll();
  }

  @Post('upvote/:postId')
  async upvote(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    return this.voteService.upvote(postId, userId);
  }

  @Post('downvote/:postId')
  async downvote(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    return this.voteService.downvote(postId, userId);
  }
}
