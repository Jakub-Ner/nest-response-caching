import { Injectable } from '@nestjs/common';
import { VoteRepository } from './vote.repository';
import { $Enums } from '@prisma/client';

@Injectable()
export class VoteService {
  constructor(private readonly voteRepository: VoteRepository) {}

  async findAll() {
    return this.voteRepository.findAll();
  }

  async upvote(postId: string, userId: string) {
    return this.voteRepository.rate(
      parseInt(postId, 10),
      parseInt(userId, 10),
      $Enums.VoteType.UP,
    );
  }
  async downvote(postId: string, userId: string) {
    return this.voteRepository.rate(
      parseInt(postId, 10),
      parseInt(userId, 10),
      $Enums.VoteType.DOWN,
    );
  }
}
