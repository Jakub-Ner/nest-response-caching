import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { VoteRepository } from './vote.repository';

@Module({
  imports: [],
  controllers: [VoteController],
  providers: [VoteService, VoteRepository],
  exports: [VoteService],
})
export class VoteModule {}
