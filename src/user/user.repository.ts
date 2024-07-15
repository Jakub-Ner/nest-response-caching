import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }

  async findBySlack(slug: string) {
    return this.prismaClient.user.findUnique({
      where: {
        username: slug,
      },
    });
  }

  updateUsername(id: number, newUsername: string) {
    return this.prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        username: newUsername,
      },
    });
  }

  findById(id: string) {
    return this.prismaClient.user.findFirst({
      where: {
        id: parseInt(id, 10),
      },
    });
  }
}
