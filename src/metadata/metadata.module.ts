// src/metadata/metadata.module.ts
import { Global, Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';

@Global()
@Module({
  providers: [MetadataService],
  exports: [MetadataService],
})
export class MetadataModule {}
