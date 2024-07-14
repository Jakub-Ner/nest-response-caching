// prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient(),
      inject: [],
    },
  ],
  exports: [PrismaClient],
})
export class PrismaModule {}
