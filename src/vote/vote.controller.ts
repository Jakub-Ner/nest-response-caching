import { Controller, Param, Post, Get, Body } from '@nestjs/common';
import { VoteService } from './vote.service';
import { $Enums } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { VoteDto } from './dto/vote-dto';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  async findAll() {
    return this.voteService.findAll();
  }

  @Post('upvote/:postId')
  async upvote(@Param('postId') postId: string, @Body() voteDto: VoteDto) {
    return this.voteService.upvote(postId, voteDto.userId);
  }

  @Post('downvote/:postId')
  async downvote(@Param('postId') postId: string, @Body() voteDto: VoteDto) {
    return this.voteService.downvote(postId, voteDto.userId);
  }

  @Get('types')
  async getTypes() {
    return $Enums.VoteType;
  }
}
