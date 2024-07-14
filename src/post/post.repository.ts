import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<Post[]> {
    return this.prismaClient.post.findMany();
  }

  async updateVotes(postId: number, likes: number, dislikes: number) {
    return this.prismaClient.post.update({
      where: {
        id: postId,
      },
      data: {
        likes,
        dislikes,
      },
    });
  }
}
