import { Injectable } from '@nestjs/common';
import { $Enums, Vote } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class VoteRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<Vote[]> {
    return this.prismaClient.vote.findMany();
  }

  async rate(postId: number, userId: number, type: $Enums.VoteType) {
    return this.prismaClient.vote.upsert({
      where: {
        postId_userId: {
          userId: userId,
          postId: postId,
        },
      },
      update: {
        type: type,
      },
      create: {
        postId,
        userId,
        type: type,
      },
    });
  }
}
