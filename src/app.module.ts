import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { VoteModule } from './vote/vote.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetadataModule } from './metadata/metadata.module';

const DEFAULT_CACHE_TTL_SECONDS = 1_000 * 60 * 60; // 1h
const REDIS_HOST = 'localhost';

const RedisCacheManager = redisStore({
  ttl: DEFAULT_CACHE_TTL_SECONDS,
  socket: {
    host: REDIS_HOST,
    port: 6379,
  },
});

@Module({
  imports: [
    PrismaModule,
    UserModule,
    VoteModule,
    PostModule,
    MetadataModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await RedisCacheManager,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
