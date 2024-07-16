// src/metadata/metadata.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class MetadataService {
  private metadata = new Map<string, any[]>();

  setMetadata(key: string, value: any) {
  const current = this.metadata.get(key);
  if (current) {
    this.metadata.set(key, [...current, value]);
  }else {
    this.metadata.set(key, [value]);
    }
  }

  getMetadata(key: string): any {
    return this.metadata.get(key);
  }

  clearMetadata(key: string) {
    this.metadata.delete(key);
  }
}
