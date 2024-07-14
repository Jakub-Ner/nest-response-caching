import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Cron } from '@nestjs/schedule';

import { VoteService } from '../vote/vote.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly voteService: VoteService,
  ) {}

  async findAll() {
    return this.postRepository.findAll();
  }

  // every 5 seconds
  @Cron('*/5 * * * * *')
  async countVotes() {
    // We could regard only new votes (based on created_at), but for simplicity we will count all votes
    const votes = await this.voteService.findAll();
    const posts = await this.postRepository.findAll();

    for (const post of posts) {
      const postVotes = votes.filter((vote) => vote.postId === post.id);
      const likes = postVotes.filter((vote) => vote.type === 'UP').length;
      const dislikes = postVotes.filter((vote) => vote.type === 'DOWN').length;
      await this.postRepository.updateVotes(post.id, likes, dislikes);
    }
  }
}
