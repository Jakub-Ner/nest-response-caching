// src/clear-cache-interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, switchMap } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER} from '@nestjs/cache-manager';
import { CLEAR_CACHE_KEY } from "./clear-cache.decorator";
import { MetadataService } from "./metadata/metadata.service";

function removeTrailingSlash(url: string): string {
  return url.replace(/\/$/, '');
}

@Injectable()
export class ClearCacheInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private redisClient: Cache,
    private readonly metadataService: MetadataService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url: string = context.switchToHttp().getRequest().url;
    let patterns = this.reflector.get<string[]>(CLEAR_CACHE_KEY, context.getHandler()) || [];


    return next.handle().pipe(
      switchMap(async (response: any) => {
        patterns = [...patterns, url, ...this.metadataService.getMetadata(CLEAR_CACHE_KEY)];
        const cleanedPatterns = patterns.map(removeTrailingSlash);

        this.metadataService.clearMetadata(CLEAR_CACHE_KEY)
        console.log('redisKeys that will be deleted if exist: ', cleanedPatterns);

        await Promise.all(
          cleanedPatterns.map(
            async (pattern) => {
              this.redisClient.store.del(pattern);

              const keysWithQuery = await this.redisClient.store.keys(`${pattern}\\?*`)
              if (keysWithQuery.length === 0) return;

              console.log('additional keys with query: ', keysWithQuery);
              await Promise.all(keysWithQuery.map(async (key) => {
                await this.redisClient.store.del(key);
              }))
            })
        );

        return response;
      })
    );
  }
}