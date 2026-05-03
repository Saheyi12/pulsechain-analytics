interface StaticCacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const memoryCache = new Map<string, StaticCacheEntry<any>>();

export class StaticCache {
  static get<T>(key: string): T | null {
    const entry = memoryCache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      memoryCache.delete(key);
      return null;
    }
    
    return entry.data as T;
  }

  static set<T>(key: string, data: T, ttl: number = 60000): void {
    memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  static delete(key: string): void {
    memoryCache.delete(key);
  }

  static clear(): void {
    memoryCache.clear();
  }

  static getOrSet<T>(
    key: string,
    factory: () => T,
    ttl: number = 60000
  ): T {
    const cached = this.get<T>(key);
    if (cached !== null) return cached;

    const data = factory();
    this.set(key, data, ttl);
    return data;
  }

  static async getOrSetAsync<T>(
    key: string,
    factory: () => Promise<T>,
    ttl: number = 60000
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) return cached;

    const data = await factory();
    this.set(key, data, ttl);
    return data;
  }

  static has(key: string): boolean {
    return this.get(key) !== null;
  }

  static size(): number {
    return memoryCache.size;
  }

  static keys(): string[] {
    return Array.from(memoryCache.keys());
  }

  static prune(): void {
    const now = Date.now();
    for (const [key, entry] of memoryCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        memoryCache.delete(key);
      }
    }
  }
}

// Auto-prune every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => StaticCache.prune(), 5 * 60 * 1000);
}

// Cached fetch utility
export async function cachedFetch<T>(
  url: string,
  options?: RequestInit,
  ttl: number = 30000
): Promise<T> {
  const cacheKey = `fetch:${url}`;
  
  const cached = StaticCache.get<T>(cacheKey);
  if (cached !== null) return cached;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  StaticCache.set(cacheKey, data, ttl);
  return data as T;
}

// Memoize function results
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 60000,
  keyFn?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn(...args);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  }) as T;
}