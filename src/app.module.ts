import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [PrismaModule, UserModule, VoteModule, PostModule],
})
export class AppModule {}
