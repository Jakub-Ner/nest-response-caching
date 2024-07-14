import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

import { VoteModule } from '../vote/vote.module';

@Module({
  imports: [VoteModule, ScheduleModule.forRoot()],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
