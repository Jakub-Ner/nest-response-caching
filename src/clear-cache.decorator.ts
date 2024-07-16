import { SetMetadata } from '@nestjs/common';

export const CLEAR_CACHE_KEY = 'clear-cache';

export const ClearCache = (patterns: string[]) => SetMetadata(CLEAR_CACHE_KEY, patterns);
